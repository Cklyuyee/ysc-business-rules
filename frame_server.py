import json
import re
from http.server import HTTPServer, BaseHTTPRequestHandler

FILE = r"C:\Users\GPR_S\.claude\projects\C--Users-GPR-S-Downloads-ysc-docs\dd820fdb-ea65-4453-933f-685d207f3f9c\tool-results\mcp-plugin_design_figma-get_metadata-1779080705245.txt"

def extract_frames():
    with open(FILE, 'r', encoding='utf-8') as f:
        raw = f.read()

    data = json.loads(raw)
    xml_text = ""
    for item in data:
        if isinstance(item, dict) and item.get('type') == 'text':
            t = item.get('text', '')
            if len(t) > 10000:
                xml_text = t
                break

    result = {
        "xml_length": len(xml_text),
        "xml_preview": xml_text[:3000],
    }

    # Use regex to find the direct children of the canvas node (1561:9117)
    # The XML structure is: <canvas id="1561:9117" ...>\n  <TAG ...> (2 spaces = depth 1 child)
    # Direct children of the canvas are at indentation level 2 spaces

    # Strategy: find all top-level elements (direct children of canvas)
    # by looking for lines starting with exactly 2 spaces followed by <TAG
    # But the XML might be all on one line... let's check with newlines

    # Check if XML has newlines
    has_newlines = '\n' in xml_text
    result["has_newlines"] = has_newlines

    if has_newlines:
        lines = xml_text.split('\n')
        result["line_count"] = len(lines)

        # Find direct children of canvas (2-space indent = depth 1)
        # Pattern: line starts with exactly 2 spaces then < (not a closing tag)
        direct_child_re = re.compile(r'^  <(?!/|canvas)(\w+)\s+id=["\'](\d+:\d+)["\'][^>]*name=["\']([^"\']*)["\']')
        direct_child_re2 = re.compile(r'^  <(?!/|canvas)(\w+)\s+name=["\']([^"\']*)["\'][^>]*id=["\'](\d+:\d+)["\']')

        direct_children = []
        seen_ids = set()

        for line in lines:
            m = direct_child_re.match(line)
            if m:
                tag, nid, name = m.group(1), m.group(2), m.group(3)
                if nid not in seen_ids:
                    seen_ids.add(nid)
                    direct_children.append({"tag": tag, "id": nid, "name": name})
                continue
            m2 = direct_child_re2.match(line)
            if m2:
                tag, name, nid = m2.group(1), m2.group(2), m2.group(3)
                if nid not in seen_ids:
                    seen_ids.add(nid)
                    direct_children.append({"tag": tag, "id": nid, "name": name})

        result["direct_children"] = direct_children
        result["direct_children_count"] = len(direct_children)

        # Find depth-2 children (4 spaces) - direct children of sections
        depth2_re = re.compile(r'^    <(?!/|canvas)(\w+)\s+id=["\'](\d+:\d+)["\'][^>]*name=["\']([^"\']*)["\']')
        depth2_re2 = re.compile(r'^    <(?!/|canvas)(\w+)\s+name=["\']([^"\']*)["\'][^>]*id=["\'](\d+:\d+)["\']')

        depth2_children = []
        seen2 = set()
        SCREEN_TAGS = {"frame", "section"}

        for line in lines:
            m = depth2_re.match(line)
            if m:
                tag, nid, name = m.group(1), m.group(2), m.group(3)
                if nid not in seen2 and tag in SCREEN_TAGS:
                    seen2.add(nid)
                    depth2_children.append({"tag": tag, "id": nid, "name": name})
                continue
            m2 = depth2_re2.match(line)
            if m2:
                tag, name, nid = m2.group(1), m2.group(2), m2.group(3)
                if nid not in seen2 and tag in SCREEN_TAGS:
                    seen2.add(nid)
                    depth2_children.append({"tag": tag, "id": nid, "name": name})

        result["depth2_screen_children"] = depth2_children[:100]

        # All frames/sections with screen-like names (any depth)
        screen_kw = re.compile(
            r'(home|หน้าแรก|search|ค้นหา|product|สินค้า|brand|แบรนด์|promo|โปรโมชัน|โปรโมชั่น'
            r'|pdp|รายละเอียด|cart|ตะกร้า|checkout|login|เข้าสู่ระบบ'
            r'|register|สมัคร|account|บัญชี|loyal|คะแนน|news|ข่าว|info|เกี่ยวกับ'
            r'|policy|นโยบาย|หน้า|payment|order|สั่งซื้อ|brand|event|popup'
            r'|เปิด|แลก|รับ|ประวัติ|คูปอง|ใบเสนอ|ส่งสินค้า|ความเป็น)',
            re.IGNORECASE
        )
        any_depth_pat = re.compile(r'<(frame|section)\s+[^>]*id=["\'](\d+:\d+)["\'][^>]*name=["\']([^"\'<>]*)["\']')
        any_depth_pat2 = re.compile(r'<(frame|section)\s+[^>]*name=["\']([^"\'<>]*)["\'][^>]*id=["\'](\d+:\d+)["\']')

        all_screens = []
        seen_all = set()

        for line in lines:
            for m in any_depth_pat.finditer(line):
                tag, nid, name = m.group(1), m.group(2), m.group(3)
                if nid not in seen_all and screen_kw.search(name):
                    seen_all.add(nid)
                    all_screens.append({"tag": tag, "id": nid, "name": name.replace('&amp;', '&').replace('&gt;', '>').replace('&lt;', '<')})
            for m in any_depth_pat2.finditer(line):
                tag, name, nid = m.group(1), m.group(2), m.group(3)
                if nid not in seen_all and screen_kw.search(name):
                    seen_all.add(nid)
                    all_screens.append({"tag": tag, "id": nid, "name": name.replace('&amp;', '&').replace('&gt;', '>').replace('&lt;', '<')})

        result["all_screen_nodes"] = all_screens

    else:
        result["note"] = "XML is on one line - using flat regex"
        # Fallback regex approach
        pat = re.compile(r'<(frame|section)\s[^>]*id=["\'](\d+:\d+)["\'][^>]*name=["\']([^"\'<>]*)["\']')
        pat2 = re.compile(r'<(frame|section)\s[^>]*name=["\']([^"\'<>]*)["\'][^>]*id=["\'](\d+:\d+)["\']')
        nodes = []
        seen = set()
        for m in pat.finditer(xml_text):
            tag, nid, name = m.group(1), m.group(2), m.group(3)
            if nid not in seen:
                seen.add(nid)
                nodes.append({"tag": tag, "id": nid, "name": name})
        for m in pat2.finditer(xml_text):
            tag, name, nid = m.group(1), m.group(2), m.group(3)
            if nid not in seen:
                seen.add(nid)
                nodes.append({"tag": tag, "id": nid, "name": name})
        result["all_nodes"] = nodes

    return result


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            data = extract_frames()
            body = json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            import traceback
            body = json.dumps({"error": str(e), "trace": traceback.format_exc()}, ensure_ascii=False).encode('utf-8')
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(body)

    def log_message(self, format, *args):
        pass


if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', 7788), Handler)
    print('Serving on http://127.0.0.1:7788', flush=True)
    server.serve_forever()
