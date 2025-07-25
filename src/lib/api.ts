export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string
  ) {
    super(message);
  }
}

// eslint-disable-next-line no-undef
const api = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new ApiError(
      errorBody.message || `Failed to fetch ${path}`,
      response.status,
      response.statusText
    );
  }

  return response.status === 204 ? (null as T) : response.json();
};

export default api;
