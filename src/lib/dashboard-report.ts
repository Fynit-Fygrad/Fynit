/** A compact, dependency-free, single-page PDF for the demo's summary report. */
export function createReportPdf(lines: string[]): Uint8Array {
  const encode = (text: string) => text.normalize('NFC').replace(/[^\x20-\xFF]/g, '-').replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
  const wrapped = lines.flatMap(line => {
    const words = line.split(' '); const result: string[] = []; let row = '';
    for (const word of words) { if ((row + word).length > 76) { result.push(row); row = ''; } row += (row ? ' ' : '') + word; }
    result.push(row); return result;
  });
  const content = ['0.106 0.376 0.875 rg', '48 775 500 4 re f', 'BT /F1 24 Tf 48 730 Td (fynit) Tj ET', '0.08 0.13 0.23 rg', ...wrapped.slice(0, 31).map((line, i) => `BT /F1 ${i === 0 ? 15 : 11} Tf 48 ${688 - i * 19} Td (${encode(line)}) Tj ET`), '0.4 0.46 0.56 rg', 'BT /F1 9 Tf 48 50 Td (Fynit - Prototipo de diseno - Datos simulados) Tj ET'].join('\n');
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>', `<< /Length ${content.length} >>\nstream\n${content}\nendstream`];
  let pdf = '%PDF-1.4\n'; const offsets = [0];
  objects.forEach((object, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Uint8Array.from(pdf, c => c.charCodeAt(0));
}
