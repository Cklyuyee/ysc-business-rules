import { useState, useMemo } from 'react';
import {
  Users, CreditCard, Star, Store, Warehouse, ShoppingCart,
  ChevronDown, ChevronRight, FileDown, AlertCircle, CheckCircle2,
  HelpCircle, BookOpen, Hash, Filter, Search, X, Package, Truck, Megaphone,
  ArrowRight, User, FileText, ClipboardList,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { USE_CASE_MODULES } from './data/useCases';
import { USE_CASE_FLOW_MODULES } from './data/useCaseFlows';
import type { BusinessRule } from './data/useCases';
import type { UseCase } from './data/useCaseFlows';

// ─── Icon Map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Users, CreditCard, Star, Store, Warehouse, ShoppingCart,
  Package, Truck, Megaphone,
};

// ─── Color Map ───────────────────────────────────────────────────────────────
const COLOR = {
  emerald: { dot: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  blue:    { dot: 'bg-blue-500',    light: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
  amber:   { dot: 'bg-amber-500',   light: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  violet:  { dot: 'bg-violet-500',  light: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200' },
  orange:  { dot: 'bg-orange-500',  light: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200' },
  sky:     { dot: 'bg-sky-500',     light: 'bg-sky-50',     text: 'text-sky-700',     border: 'border-sky-200' },
  rose:    { dot: 'bg-rose-500',    light: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200' },
  teal:    { dot: 'bg-teal-500',    light: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200' },
} as const;
type ColorKey = keyof typeof COLOR;

type ViewTab = 'rules' | 'usecases';

// ─── DocX Export (Business Rules) ───────────────────────────────────────────
async function exportRulesToDocx() {
  const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
    ShadingType, PageNumber, PageBreak,
  } = await import('docx');

  const BRAND = '1E3A5F', ACCENT = '2E75B6';
  const GRAY_LINE = 'CCCCCC', WHITE = 'FFFFFF', TEXT_DARK = '1A1A2E';
  const PAGE_W = 11906, MARGIN = 1440, CW = PAGE_W - MARGIN * 2;

  const bold = (t: string, s = 20, c = TEXT_DARK) => new TextRun({ text: t, bold: true, size: s, font: 'Arial', color: c });
  const normal = (t: string, s = 20, c = TEXT_DARK) => new TextRun({ text: t, size: s, font: 'Arial', color: c });
  const border = (c = GRAY_LINE) => ({ style: BorderStyle.SINGLE, size: 1, color: c });
  const borders = (c = GRAY_LINE) => ({ top: border(c), bottom: border(c), left: border(c), right: border(c) });

  const children: any[] = [];

  children.push(
    new Paragraph({ children: [bold('YSC ERP', 52, WHITE)], alignment: AlignmentType.CENTER,
      shading: { fill: BRAND, type: ShadingType.CLEAR }, spacing: { before: 1440, after: 0 }, indent: { left: 720, right: 720 } }),
    new Paragraph({ children: [bold('Business Rules Document', 40, WHITE)], alignment: AlignmentType.CENTER,
      shading: { fill: BRAND, type: ShadingType.CLEAR }, spacing: { before: 0, after: 0 }, indent: { left: 720, right: 720 } }),
    new Paragraph({ children: [normal('Backoffice System', 22, 'D6E4F0')], alignment: AlignmentType.CENTER,
      shading: { fill: BRAND, type: ShadingType.CLEAR }, spacing: { before: 120, after: 3600 }, indent: { left: 720, right: 720 } }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  USE_CASE_MODULES.forEach((mod, mi) => {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: mi > 0,
        children: [bold(`Module ${mi + 1}: ${mod.title}`, 28, BRAND)], spacing: { before: 280, after: 200 } }),
      new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 1 } }, spacing: { before: 0, after: 160 }, children: [] }),
    );
    mod.rules.forEach(rule => {
      children.push(
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold(`${rule.id}  ${rule.title}`, 24, BRAND)], spacing: { before: 300, after: 100 } }),
        new Paragraph({ children: [normal(rule.description, 20)], spacing: { after: 120 } }),
      );
      rule.conditions?.forEach(c => { children.push(new Paragraph({ children: [normal(`  •  ${c}`, 18)], spacing: { after: 40 } })); });
      if (rule.table) {
        const cols = rule.table.headers.length, colW = Math.floor(CW / cols);
        children.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: Array(cols).fill(colW),
          rows: [
            new TableRow({ children: rule.table.headers.map(h => new TableCell({ width: { size: colW, type: WidthType.DXA }, shading: { fill: BRAND, type: ShadingType.CLEAR }, borders: borders(BRAND), margins: { top: 60, bottom: 60, left: 100, right: 60 }, children: [new Paragraph({ children: [bold(h, 16, WHITE)] })] })) }),
            ...rule.table.rows.map(r => new TableRow({ children: r.map(cell => new TableCell({ width: { size: colW, type: WidthType.DXA }, borders: borders(), margins: { top: 60, bottom: 60, left: 100, right: 60 }, children: [new Paragraph({ children: [normal(cell, 16)] })] })) })),
          ] }));
      }
      rule.notes?.forEach(n => { children.push(new Paragraph({ children: [new TextRun({ text: `  ${n}`, size: 18, font: 'Arial', color: '2E75B6', italics: true })], spacing: { after: 40 } })); });
      if (rule.decisions?.length) children.push(new Paragraph({ children: [normal(`Ref: ${rule.decisions.join(', ')}`, 16, '888888')], spacing: { after: 40 } }));
      rule.openQuestions?.forEach(q => { children.push(new Paragraph({ children: [new TextRun({ text: `  ${q}`, size: 18, font: 'Arial', color: 'C55A11' })], spacing: { after: 40 } })); });
      children.push(new Paragraph({ children: [], spacing: { before: 80, after: 120 } }));
    });
  });

  const doc = new Document({
    styles: { default: { document: { run: { font: 'Arial', size: 20, color: TEXT_DARK } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: 'Arial', color: BRAND }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, font: 'Arial', color: BRAND }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      ] },
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [normal('YSC ERP — Business Rules', 16, ACCENT)], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 1 } } })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ children: [normal('YSC Backoffice', 16, GRAY_LINE), new TextRun({ text: '\t', font: 'Arial' }), normal('Page ', 16, GRAY_LINE), new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: GRAY_LINE })], tabStops: [{ type: 'right', position: CW }], border: { top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 1 } } })] }) },
      children,
    }],
  });

  const buffer = await Packer.toBlob(doc);
  const url = URL.createObjectURL(buffer);
  const a = document.createElement('a'); a.href = url; a.download = 'YSC_BusinessRules.docx'; a.click();
  URL.revokeObjectURL(url);
}

// ─── DocX Export (Use Cases) ────────────────────────────────────────────────
async function exportUseCasesToDocx() {
  const {
    Document, Packer, Paragraph, TextRun,
    Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
    ShadingType, PageNumber, PageBreak, LevelFormat,
  } = await import('docx');

  const BRAND = '1E3A5F', ACCENT = '2E75B6';
  const GRAY_LINE = 'CCCCCC', WHITE = 'FFFFFF', TEXT_DARK = '1A1A2E';
  const PAGE_W = 11906, MARGIN = 1440, CW = PAGE_W - MARGIN * 2;

  const bold = (t: string, s = 20, c = TEXT_DARK) => new TextRun({ text: t, bold: true, size: s, font: 'Arial', color: c });
  const normal = (t: string, s = 20, c = TEXT_DARK) => new TextRun({ text: t, size: s, font: 'Arial', color: c });

  const children: any[] = [];

  // Cover
  children.push(
    new Paragraph({ children: [bold('YSC ERP', 52, WHITE)], alignment: AlignmentType.CENTER,
      shading: { fill: BRAND, type: ShadingType.CLEAR }, spacing: { before: 1440, after: 0 }, indent: { left: 720, right: 720 } }),
    new Paragraph({ children: [bold('Use Case Document', 40, WHITE)], alignment: AlignmentType.CENTER,
      shading: { fill: BRAND, type: ShadingType.CLEAR }, spacing: { before: 0, after: 0 }, indent: { left: 720, right: 720 } }),
    new Paragraph({ children: [normal('Backoffice System', 22, 'D6E4F0')], alignment: AlignmentType.CENTER,
      shading: { fill: BRAND, type: ShadingType.CLEAR }, spacing: { before: 120, after: 3600 }, indent: { left: 720, right: 720 } }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  USE_CASE_FLOW_MODULES.forEach((mod, mi) => {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: mi > 0,
        children: [bold(`Module ${mi + 1}: ${mod.title}`, 28, BRAND)], spacing: { before: 280, after: 200 } }),
      new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 1 } }, spacing: { before: 0, after: 160 }, children: [] }),
    );

    mod.useCases.forEach(uc => {
      children.push(
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [bold(`${uc.id}  ${uc.title}`, 24, BRAND)], spacing: { before: 300, after: 100 } }),
        new Paragraph({ children: [bold('Actor: ', 18, ACCENT), normal(uc.actor, 18)], spacing: { after: 80 } }),
      );

      if (uc.preconditions?.length) {
        children.push(new Paragraph({ children: [bold('Preconditions', 18, TEXT_DARK)], spacing: { before: 120, after: 60 } }));
        uc.preconditions.forEach(p => children.push(new Paragraph({ children: [normal(`  •  ${p}`, 18)], spacing: { after: 30 } })));
      }

      children.push(new Paragraph({ children: [bold('Main Flow', 18, TEXT_DARK)], spacing: { before: 120, after: 60 } }));
      uc.mainFlow.forEach((s, i) => children.push(new Paragraph({ children: [normal(`  ${i + 1}. ${s}`, 18)], spacing: { after: 30 } })));

      if (uc.alternativeFlow?.length) {
        children.push(new Paragraph({ children: [bold('Alternative Flow', 18, TEXT_DARK)], spacing: { before: 120, after: 60 } }));
        uc.alternativeFlow.forEach(af => {
          children.push(new Paragraph({ children: [bold(`  [${af.label}]`, 18, ACCENT)], spacing: { after: 30 } }));
          af.steps.forEach(s => children.push(new Paragraph({ children: [normal(`    •  ${s}`, 18)], spacing: { after: 30 } })));
        });
      }

      if (uc.postconditions?.length) {
        children.push(new Paragraph({ children: [bold('Postconditions', 18, TEXT_DARK)], spacing: { before: 120, after: 60 } }));
        uc.postconditions.forEach(p => children.push(new Paragraph({ children: [normal(`  •  ${p}`, 18)], spacing: { after: 30 } })));
      }

      if (uc.businessRules?.length) {
        children.push(new Paragraph({ children: [normal(`Ref: ${uc.businessRules.join(', ')}`, 16, '888888')], spacing: { before: 80, after: 40 } }));
      }

      uc.notes?.forEach(n => {
        children.push(new Paragraph({ children: [new TextRun({ text: `  ${n}`, size: 18, font: 'Arial', color: '2E75B6', italics: true })], spacing: { after: 40 } }));
      });

      children.push(new Paragraph({ children: [], spacing: { before: 80, after: 120 } }));
    });
  });

  const doc = new Document({
    styles: { default: { document: { run: { font: 'Arial', size: 20, color: TEXT_DARK } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: 'Arial', color: BRAND }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, font: 'Arial', color: BRAND }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      ] },
    numbering: { config: [{ reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [normal('YSC ERP — Use Cases', 16, ACCENT)], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 1 } } })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ children: [normal('YSC Backoffice', 16, GRAY_LINE), new TextRun({ text: '\t', font: 'Arial' }), normal('Page ', 16, GRAY_LINE), new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: GRAY_LINE })], tabStops: [{ type: 'right', position: CW }], border: { top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 1 } } })] }) },
      children,
    }],
  });

  const buffer = await Packer.toBlob(doc);
  const url = URL.createObjectURL(buffer);
  const a = document.createElement('a'); a.href = url; a.download = 'YSC_UseCases.docx'; a.click();
  URL.revokeObjectURL(url);
}

// ─── Badge ───────────────────────────────────────────────────────────────────
function Badge({ label, variant = 'default', icon: Icon }: { label: string; variant?: string; icon?: LucideIcon }) {
  const styles: Record<string, string> = {
    default: 'bg-blue-50 text-blue-700 border-blue-200',
    neutral: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold ${styles[variant] || styles.default}`}>
      {Icon && <Icon className="w-3 h-3" />}{label}
    </span>
  );
}

// ─── Rule Card ───────────────────────────────────────────────────────────────
function RuleCard({ rule, color }: { rule: BusinessRule; color: ColorKey }) {
  const [open, setOpen] = useState(false);
  const c = COLOR[color];
  const hasDetails = !!(rule.conditions?.length || rule.table || rule.notes?.length || rule.openQuestions?.length);

  return (
    <div className={`border rounded-xl overflow-hidden transition-shadow ${open ? 'shadow-md border-neutral-200' : 'border-neutral-100 hover:shadow-sm'}`}>
      <button onClick={() => hasDetails && setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left bg-white hover:bg-neutral-50/50 transition-colors">
        <div className={`w-1.5 h-8 rounded-full shrink-0 ${c.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge label={rule.id} variant="neutral" />
            <span className="text-sm font-semibold text-neutral-800">{rule.title}</span>
            {rule.openQuestions?.length ? <Badge label="Open Question" variant="warning" icon={HelpCircle} /> : null}
            {rule.decisions?.map(d => <Badge key={d} label={d} variant="info" />)}
          </div>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{rule.description}</p>
        </div>
        {hasDetails && <div className="shrink-0 text-neutral-400">{open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</div>}
      </button>

      {open && hasDetails && (
        <div className="px-5 pb-5 pt-0 space-y-4 border-t border-neutral-100 bg-neutral-50/30">
          {rule.conditions && rule.conditions.length > 0 && (
            <div className="pt-4">
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Conditions
              </h4>
              <ul className="space-y-1.5">
                {rule.conditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />{c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {rule.table && (
            <div className="pt-2 overflow-x-auto rounded-lg border border-neutral-200">
              <table className="w-full text-sm">
                <thead><tr className="bg-neutral-100">
                  {rule.table.headers.map((h, i) => <th key={i} className="text-left px-4 py-2.5 text-xs text-neutral-500 font-semibold uppercase tracking-wide">{h}</th>)}
                </tr></thead>
                <tbody>{rule.table.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-neutral-100 hover:bg-neutral-50">
                    {row.map((cell, ci) => <td key={ci} className="px-4 py-2.5 text-sm text-neutral-700">{cell}</td>)}
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
          {rule.notes?.map((n, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              <BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" />{n}
            </div>
          ))}
          {rule.openQuestions && rule.openQuestions.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Open Questions
              </h4>
              {rule.openQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-1.5">
                  <HelpCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />{q}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Use Case Card ───────────────────────────────────────────────────────────
function UseCaseCard({ uc, color }: { uc: UseCase; color: ColorKey }) {
  const [open, setOpen] = useState(false);
  const c = COLOR[color];

  return (
    <div className={`border rounded-xl overflow-hidden transition-shadow ${open ? 'shadow-md border-neutral-200' : 'border-neutral-100 hover:shadow-sm'}`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left bg-white hover:bg-neutral-50/50 transition-colors">
        <div className={`w-1.5 h-8 rounded-full shrink-0 ${c.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge label={uc.id} variant="neutral" />
            <span className="text-sm font-semibold text-neutral-800">{uc.title}</span>
            <Badge label={uc.actor} variant="info" icon={User} />
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {uc.mainFlow.length} steps
            {uc.alternativeFlow?.length ? ` · ${uc.alternativeFlow.length} alt flow` : ''}
            {uc.businessRules?.length ? ` · ${uc.businessRules.join(', ')}` : ''}
          </p>
        </div>
        <div className="shrink-0 text-neutral-400">{open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-0 space-y-4 border-t border-neutral-100 bg-neutral-50/30">
          {/* Preconditions */}
          {uc.preconditions && uc.preconditions.length > 0 && (
            <div className="pt-4">
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Preconditions
              </h4>
              <ul className="space-y-1.5">
                {uc.preconditions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Flow */}
          <div className="pt-2">
            <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5" /> Main Flow
            </h4>
            <ol className="space-y-1.5">
              {uc.mainFlow.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Alternative Flow */}
          {uc.alternativeFlow && uc.alternativeFlow.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Alternative Flow
              </h4>
              {uc.alternativeFlow.map((af, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="text-xs font-semibold text-amber-700 mb-1.5 px-2 py-1 bg-amber-50 rounded-md inline-block border border-amber-100">{af.label}</div>
                  <ul className="space-y-1 ml-1">
                    {af.steps.map((s, si) => (
                      <li key={si} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Postconditions */}
          {uc.postconditions && uc.postconditions.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Postconditions
              </h4>
              <ul className="space-y-1.5">
                {uc.postconditions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Business Rules ref */}
          {uc.businessRules && uc.businessRules.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-2">
              <span className="text-xs text-neutral-400">Related Rules:</span>
              {uc.businessRules.map(br => <Badge key={br} label={br} variant="default" icon={FileText} />)}
            </div>
          )}

          {/* Notes */}
          {uc.notes?.map((n, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              <BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" />{n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<ViewTab>('rules');
  const [search, setSearch] = useState('');
  const [activeModule, setActiveModule] = useState<string | 'all'>('all');
  const [exporting, setExporting] = useState(false);

  const totalRules = USE_CASE_MODULES.reduce((s, m) => s + m.rules.length, 0);
  const totalQuestions = USE_CASE_MODULES.reduce((s, m) => s + m.rules.reduce((s2, r) => s2 + (r.openQuestions?.length ?? 0), 0), 0);
  const totalUseCases = USE_CASE_FLOW_MODULES.reduce((s, m) => s + m.useCases.length, 0);

  // Filtered Business Rules
  const filteredRuleModules = useMemo(() => {
    if (view !== 'rules') return [];
    let mods = activeModule === 'all' ? USE_CASE_MODULES : USE_CASE_MODULES.filter(m => m.id === activeModule);
    if (search.trim()) {
      const q = search.toLowerCase();
      mods = mods.map(m => ({ ...m, rules: m.rules.filter(r =>
        r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) || r.conditions?.some(c => c.toLowerCase().includes(q)) ||
        r.decisions?.some(d => d.toLowerCase().includes(q))
      ) })).filter(m => m.rules.length > 0);
    }
    return mods;
  }, [search, activeModule, view]);

  // Filtered Use Cases
  const filteredUCModules = useMemo(() => {
    if (view !== 'usecases') return [];
    let mods = activeModule === 'all' ? USE_CASE_FLOW_MODULES : USE_CASE_FLOW_MODULES.filter(m => m.id === activeModule);
    if (search.trim()) {
      const q = search.toLowerCase();
      mods = mods.map(m => ({ ...m, useCases: m.useCases.filter(uc =>
        uc.id.toLowerCase().includes(q) || uc.title.toLowerCase().includes(q) ||
        uc.actor.toLowerCase().includes(q) ||
        uc.mainFlow.some(s => s.toLowerCase().includes(q)) ||
        uc.businessRules?.some(br => br.toLowerCase().includes(q))
      ) })).filter(m => m.useCases.length > 0);
    }
    return mods;
  }, [search, activeModule, view]);

  const currentModules = view === 'rules' ? USE_CASE_MODULES : USE_CASE_FLOW_MODULES;

  const handleExport = async () => {
    setExporting(true);
    try {
      if (view === 'rules') await exportRulesToDocx();
      else await exportUseCasesToDocx();
    } catch (e) { console.error(e); } finally { setExporting(false); }
  };

  // Reset filter when switching view
  const switchView = (v: ViewTab) => {
    setView(v);
    setActiveModule('all');
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1e3a5f] flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-neutral-900">YSC Business Rules & Use Cases</h1>
              </div>
              <p className="text-xs text-neutral-500 mt-1 ml-11">
                {totalRules} rules | {totalUseCases} use cases | {USE_CASE_MODULES.length + USE_CASE_FLOW_MODULES.length} modules | {totalQuestions} open questions
              </p>
            </div>
            <button onClick={handleExport} disabled={exporting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563eb] text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm">
              <FileDown className="w-4 h-4" />{exporting ? 'Exporting...' : `Export ${view === 'rules' ? 'Rules' : 'Use Cases'} .docx`}
            </button>
          </div>

          {/* View Tabs */}
          <div className="flex gap-1 mt-4 bg-neutral-100 p-1 rounded-lg w-fit">
            <button onClick={() => switchView('rules')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                view === 'rules' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
              }`}>
              <ClipboardList className="w-4 h-4" />
              Business Rules ({totalRules})
            </button>
            <button onClick={() => switchView('usecases')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                view === 'usecases' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
              }`}>
              <FileText className="w-4 h-4" />
              Use Cases ({totalUseCases})
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-flex items-center">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={view === 'rules' ? 'Search rules, D-NNN...' : 'Search use cases, actor, BR-NNN...'}
              className="pl-9 pr-8 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-72 placeholder:text-neutral-400" />
            {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-neutral-400 hover:text-neutral-600"><X className="w-3.5 h-3.5" /></button>}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-neutral-400" />
            <button onClick={() => setActiveModule('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeModule === 'all' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
              All ({view === 'rules' ? totalRules : totalUseCases})
            </button>
            {currentModules.map(m => {
              const Icon = ICON_MAP[m.icon] ?? BookOpen;
              const isActive = activeModule === m.id;
              const count = view === 'rules'
                ? (m as typeof USE_CASE_MODULES[0]).rules?.length ?? 0
                : (m as typeof USE_CASE_FLOW_MODULES[0]).useCases?.length ?? 0;
              return (
                <button key={m.id} onClick={() => setActiveModule(isActive ? 'all' : m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
                  <Icon className="w-3.5 h-3.5" />{m.id} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Business Rules View */}
        {view === 'rules' && (
          <>
            {filteredRuleModules.length === 0 ? (
              <div className="text-center py-20">
                <Hash className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">No rules found</p>
              </div>
            ) : filteredRuleModules.map(mod => {
              const Icon = ICON_MAP[mod.icon] ?? BookOpen;
              return (
                <section key={mod.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-neutral-100">
                    <Icon className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm font-semibold text-neutral-800">{mod.title}</span>
                    <span className="text-xs text-neutral-400">({mod.rules.length})</span>
                  </div>
                  <div className="p-5 space-y-3">
                    {mod.rules.map(rule => <RuleCard key={rule.id} rule={rule} color={mod.color as ColorKey} />)}
                  </div>
                </section>
              );
            })}
          </>
        )}

        {/* Use Cases View */}
        {view === 'usecases' && (
          <>
            {filteredUCModules.length === 0 ? (
              <div className="text-center py-20">
                <Hash className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">No use cases found</p>
              </div>
            ) : filteredUCModules.map(mod => {
              const Icon = ICON_MAP[mod.icon] ?? BookOpen;
              return (
                <section key={mod.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-neutral-100">
                    <Icon className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm font-semibold text-neutral-800">{mod.title}</span>
                    <span className="text-xs text-neutral-400">({mod.useCases.length})</span>
                  </div>
                  <div className="p-5 space-y-3">
                    {mod.useCases.map(uc => <UseCaseCard key={uc.id} uc={uc} color={mod.color as ColorKey} />)}
                  </div>
                </section>
              );
            })}
          </>
        )}

        <footer className="text-center py-8 text-xs text-neutral-400">
          YSC ERP — Business Rules & Use Cases | Source: team-knowledge-main (9 meetings)
        </footer>
      </main>
    </div>
  );
}
