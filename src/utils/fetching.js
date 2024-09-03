const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl)

export async function fetchAutos() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }
  