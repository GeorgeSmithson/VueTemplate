export async function fetchWithTimeout(resource:string, options:any = {}): Promise<Response> {
    const { timeout= 8000 } = options;
    
    const controller: AbortController = new AbortController();
    const id: number = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
  }