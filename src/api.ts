import { API_URL } from "./constants"
import { checkDataValidity, throwError } from "./utils"
import errors from './errors'

export default {
  loadData: async (apiKey: string) => {
    const res = await fetch(`${API_URL}/data?api_key=${apiKey}`)
    if (!res.ok) throwError(errors.FAILED_LOAD_DATA)

    const data = await res.json()
    checkDataValidity(data)

    return data
  },
  createIdentity: (value: string, apiKey: string) => fetch(`${API_URL}/identities?api_key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({ value })
  })
}