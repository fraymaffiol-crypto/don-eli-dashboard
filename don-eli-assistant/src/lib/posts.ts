import fs from 'fs';
import path from 'path';

// ══════════════════════════════════════════════════════════════
// TIPOS
// ══════════════════════════════════════════════════════════════

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'list'; items: string[] }
  | { type: 'chart' };

export interface CostItem {
  label: string;
  value: number;
  unit: string;
  color: string;
}

export interface KeyMetric {
  label: string;
  value: string;
  unit: string;
  icon: string;
}

export interface ArabicaPoint {
  mes: string;
  arabica: number;
  robusta: number;
}

export interface ChartData {
  costsImpact: CostItem[];
  keyMetrics: KeyMetric[];
  arabicaVsRobusta: ArabicaPoint[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readTime: number;
  content: ContentBlock[];
  chartData?: ChartData;
}

// ══════════════════════════════════════════════════════════════
// LECTURA DE ARCHIVOS
// ══════════════════════════════════════════════════════════════

const POSTS_DIR = path.join(process.cwd(), 'src', 'data', 'posts');

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((file) => JSON.parse(fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')) as Post)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Post;
}

export function getAllSlugs(): { slug: string }[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace('.json', '') }));
}
