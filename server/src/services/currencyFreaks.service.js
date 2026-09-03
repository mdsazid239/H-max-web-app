const CURRENCYFREAKS_URL = "https://api.currencyfreaks.com/latest";

export async function fetchCurrencyFreaksRates() {
  const apiKey = process.env.CURRENCYFREAKS_API_KEY;

  if (!apiKey) {
    throw new Error("CURRENCYFREAKS_API_KEY is not configured");
  }

  const url = `${CURRENCYFREAKS_URL}?apikey=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();

    console.error("CurrencyFreaks API error:", response.status, errorText);

    throw new Error(`CurrencyFreaks API failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data?.rates?.INR) {
    throw new Error("Invalid response from CurrencyFreaks: INR rate missing");
  }

  return data;
}
