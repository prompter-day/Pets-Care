export async function getLocation (coords: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const callback = async (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const resp = await result
        resolve(resp)
      } else {
        reject(new Error('Failed to retrieve location data'))
      }
    }

    const places = new kakao.maps.services.Places()
    const options = {
      location: new kakao.maps.LatLng(Number(coords?.latitude), Number(coords?.longitude)),
      radius: 2000,
      sort: kakao.maps.services.SortBy.DISTANCE
    }
    places.keywordSearch('동물병원', callback, options)
  })

}