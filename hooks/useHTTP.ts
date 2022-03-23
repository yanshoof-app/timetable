import axios, { AxiosResponse } from 'axios'
import { useState, useCallback, useEffect, useRef } from 'react'

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
  const isLoading = useRef(fetchOnMount)
  const fetchedOnMount = useRef(false)
  const [data, setData] = useState<Result>(initialValue)
  const [error, setError] = useState(false)

  const doFetch = useCallback(
    async (data: ReqData = {} as ReqData) => {
      isLoading.current = true
      let res: AxiosResponse<Result>
      if (method == 'GET') res = await axios.get<Result>(path, { params: data })
      else res = await axios({ method, url: path, data })

      isLoading.current = false
      if (res.status === 200) setData(res.data)
      else setError(true)

      return res.data
    },
    [method, path]
  )

  useEffect(() => {
<<<<<<< HEAD
    if (fetchOnMount && reqData) doFetch(reqData)
  }, [doFetch])
=======
    if (fetchOnMount && reqData && !fetchedOnMount.current) doFetch(reqData)
    fetchedOnMount.current = true
  }, [doFetch, fetchOnMount, reqData])
>>>>>>> 7dbeea7f30ad78c7a346735ef0363137782edfe8

  return { isLoading, data, doFetch, error }
}
