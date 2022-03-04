import axios, { AxiosResponse } from 'axios'
import { useState, useCallback, useEffect } from 'react'

export interface HTTPParams<Result> {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  fetchOnMount?: boolean
  initialValue?: Result
}

export function useHTTP<ReqData = unknown, Result = unknown>({
  path,
  method = 'GET',
  fetchOnMount = true,
  initialValue = {} as Result,
}: HTTPParams<Result>) {
  const [isLoading, setLoading] = useState(fetchOnMount)
  const [data, setData] = useState<Result>(initialValue)
  const [error, setError] = useState(false)

  const doFetch = useCallback(
    async (data: ReqData = {} as ReqData) => {
      setLoading(true)
      let res: AxiosResponse<Result>
      if (method == 'GET') res = await axios.get<Result>(path, { params: data })
      else res = await axios({ method, url: path, data })

      setLoading(false)
      if (res.status === 200) setData(res.data)
      else setError(true)

      return res.data
    },
    [method, path]
  )

  useEffect(() => {
    fetchOnMount && doFetch()
  }, [doFetch, fetchOnMount])

  return { isLoading, data, doFetch, error }
}
