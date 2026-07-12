import fs from 'node:fs/promises';

const base = 'web-design-showcase/data-assets';
const files = ['manifest.json','facts.ru.json','images.json','short-version.ru.json','short-version.schema.json'];
const parsed = {};
for (const file of files) parsed[file] = JSON.parse(await fs.readFile(`${base}/${file}`,'utf8'));

const content = parsed['short-version.ru.json'];
const facts = parsed['facts.ru.json'].facts;
const images = parsed['images.json'].images;
const errors = [];

if (content.sections.length !== 16) errors.push(`Expected 16 sections, found ${content.sections.length}`);
const orders = content.sections.map(section=>section.order);
if (orders.some((order,index)=>order !== index+1)) errors.push(`Invalid order: ${orders.join(', ')}`);
const sectionIds = content.sections.map(section=>section.id);
if (new Set(sectionIds).size !== 16) errors.push('Section IDs are not unique');

const factIds = new Set(facts.map(fact=>fact.id));
const imageIds = new Set(images.map(image=>image.id));
for (const section of content.sections) {
  for (const factId of section.factIds || []) if (!factIds.has(factId)) errors.push(`${section.id}: unknown fact ${factId}`);
  for (const item of section.items || []) for (const factId of item.factIds || []) if (!factIds.has(factId)) errors.push(`${section.id}: unknown item fact ${factId}`);
  for (const metric of section.metrics || []) if (metric.factId && !factIds.has(metric.factId)) errors.push(`${section.id}: unknown metric fact ${metric.factId}`);
  for (const imageId of section.imageIds || []) if (!imageIds.has(imageId)) errors.push(`${section.id}: unknown image ${imageId}`);
}

const serialized = JSON.stringify(content);
for (const required of ['1 000 м²','20 соток','3 этажа','Кабардинская, 189','+7 964 033-01-86','tomabloom@mail.ru']) {
  const haystack = serialized + JSON.stringify(content.contact);
  if (!haystack.includes(required)) errors.push(`Missing required value: ${required}`);
}

if (errors.length) {
  console.error(JSON.stringify({valid:false,errors},null,2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({valid:true,files:files.length,sections:16,facts:facts.length,images:images.length},null,2));
}
