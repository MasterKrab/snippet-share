import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const useFetchData = <DataType>(
  url: string,
  options: AxiosRequestConfig | (() => AxiosRequestConfig),
  dependencies: any[] = []
) => {
  const [data, setData] = useState<DataType>()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const normalizedOptions =
      typeof options === 'function' ? options() : options

    axios
      .get(url, normalizedOptions)
      .then(({ data }) => setData(data))
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, dependencies)

  return { data, error, isLoading }
}

export default useFetchData
