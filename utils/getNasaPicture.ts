const NASA_ENDPOINT = process.env.NEXT_PUBLIC_NASA_API_ENDPOINT
const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY
export default async function getNasaPicture(date?: string) {
  const now = new Date().toISOString().split('T')[0];
  const url = `${NASA_ENDPOINT}/apod?api_key=${NASA_API_KEY}&date=${date || now}&hd=true`
  const response = await fetch(url);
  const data = await response.json();
  return data;
}