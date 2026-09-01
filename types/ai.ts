export interface Generate3DRequest {
  prompt: string;
}

export interface Generate3DResponse {
  success: boolean;
  modelUrl?: string;
  error?: string;
}
