import {File} from './file';

export interface Story {
  id: string;
  title: string;
  cover: File;
  unitPrice: number;
  shareProfit: number;
  takes: number;
  award: number;
  gold: number;
  introduce: string;
  createdAt: string;
  updatedAt: string;
}
