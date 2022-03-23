export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt;
  source: { name: string; url: string };
}
export interface News {
  totalArticles: number;
  articles: Article[];
}
