declare namespace NFeedResponse {

  export interface Source {
    id: string | null;
    name: string;
  }

  export interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: any;
    content: string;
  }

  export interface RootObject {
    status: string;
    totalResults: number;
    articles: Article[];
  }

}

