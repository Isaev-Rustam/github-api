export function debounceAsync<Args extends unknown[], Return>(
  callback: (...args: Args) => Promise<Return>,
  tm = 500
): (...args: Args) => Promise<Return> {
  let timeId: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Args): Promise<Return> {
    if (timeId) clearTimeout(timeId)

    return new Promise<Return>((res, rej) => {
      timeId = setTimeout(async () => {
        callback
          .apply(this, args)
          .then(result => res(result))
          .catch(error => rej(error))
      }, tm)
    })
  }
}
