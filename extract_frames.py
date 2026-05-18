import re
import json
import sys

FILE = r"C:\Users\GPR_S\.claude\projects\C--Users-GPR-S-Downloads-ysc-docs\dd820fdb-ea65-4453-933f-685d207f3f9c\tool-results\mcp-plugin_design_figma-get_metadata-1779080705245.txt"
OUT  = r"C:\Users\GPR_S\Downloads\ysc-docs\frames_output.txt"

with open(FILE, 'r', encoding='utf-8') as f:
    raw = f.read()

# The file is a JSON array [{type,text},...]. Pull the big XML text entry.
data = json.loads(raw)
xml_text = ""
for item in data:
    if isinstance(item, dict) and item.get('type') == 'text':
        t = item.get('text', '')
        if len(t) > 10000:
            xml_text = t
            break

lines = []
lines.append(f"XML length: {len(xml_text)}")
lines.append(f"XML first 800 chars:\n{xml_text[:800]}\n---")

# Strategy: find all XML tags that have both an id= and a name= attribute
# Pattern handles any order of attributes
tag_re = re.compile(
    r'<(\w+)\s[^>]*?(?:id=["\'](\d+:\d+)["\'][^>]*?name=["\']([^"\']*)["\']'
    r'|name=["\']([^"\']*)["\'][^>]*?id=["\'](\d+:\d+)["\'])[^>]*/?>',
    re.DOTALL
)

all_nodes = []
for m in tag_re.finditer(xml_text):
    tag  = m.group(1)
    nid  = m.group(2) or m.group(5)
    name = m.group(3) or m.group(4)
    all_nodes.append((tag, nid, name))

lines.append(f"Total tagged nodes found: {len(all_nodes)}")
lines.append("---ALL NODES (tag | id | name)---")
for tag, nid, name in all_nodes:
    lines.append(f"{tag} | {nid} | {name}")

# Filter for likely top-level screen frames
screen_kw = re.compile(
    r'(home|หน้าแรก|search|ค้นหา|product|สินค้า|brand|แบรนด์|promo|โปรโมชั่น'
    r'|pdp|รายละเอียด|cart|ตะกร้า|checkout|checkout|login|เข้าสู่ระบบ'
    r'|register|สมัคร|account|บัญชี|loyal|คะแนน|news|ข่าว|info|เกี่ยวกับ'
    r'|policy|นโยบาย|screen|หน้า)',
    re.IGNORECASE
)

lines.append("\n---FILTERED SCREEN NODES---")
for tag, nid, name in all_nodes:
    if screen_kw.search(name):
        lines.append(f"{tag} | {nid} | {name}")

with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"Done. Output written to {OUT}")
print(f"Total nodes: {len(all_nodes)}")
