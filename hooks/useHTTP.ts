import axios, { AxiosResponse } from 'axios'
import { useState, useCallback, useEffect } from 'react'

export interface HTTPParams<ReqData, Result> {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  fetchOnMount?: boolean
  initialValue?: Result
  reqData?: ReqData
}

export function useHTTP<ReqData = unknown, Result = unknown>({
  path,
  method = 'GET',
  fetchOnMount = true,
  initialValue = {} as Result,
  reqData = {} as ReqData,
}: HTTPParams<ReqData, Result>) {
  const [isLoading, setLoading] = useState(fetchOnMount)
  const [data, setData] = useState<Result>(initialValue)
  const [error, setError] = useState(false)

  const doFetch = useCallback(
    async (data: ReqData = {} as ReqData) => {
      try {
        setLoading(true)
        let res: AxiosResponse<Result>
        if (method == 'GET')
          res = await axios.get<Result>(path, { params: data })
        else res = await axios({ method, url: path, data })

        setLoading(false)
        if (res.status === 200) {
          setData(res.data)
          setError(false)
        } else setError(true)

        return res.data
      } catch (err) {
        setError(true)
        setLoading(false)
        return {} as Result
      }
    },
    [method, path]
  )

  useEffect(() => {
    if (fetchOnMount && reqData) doFetch(reqData)
  }, [doFetch, fetchOnMount, reqData])

  return { isLoading, data, doFetch, error }
}
