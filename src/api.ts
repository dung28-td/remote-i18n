import { API_URL } from "./constants"

export default {
  loadData: async (apiKey: string) => {
    const res = await fetch(`${API_URL}/data?api_key=${apiKey}`)
    return await res.json()
  },
  createIdentity: (value: string, apiKey: string) => fetch(`${API_URL}/identities?api_key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({ value })
  })
}