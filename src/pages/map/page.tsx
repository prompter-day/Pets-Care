import { Fragment, useEffect, useState } from "react"
import { useGeolocated } from "react-geolocated"
import KakaoMap from "../../components/kakaomap/component"
import Loading from "../../components/loading/component"

export default function Map (props: { id: number }) {
  const [load, setLoad] = useState(true)

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    setTimeout(() => setLoad(false), 2000)
  }, [])

  return (
    <Fragment>
      { load ? <Loading /> : null }

      { !isGeolocationAvailable ? <div className='w-screen h-screen flex justify-center items-center bg-gray-800 text-white font-bold text-2xl'>사용자의 위치 정보를 가져올 수 없어요.</div> :
      ! isGeolocationEnabled ? <div className='w-screen h-screen flex justify-center items-center bg-gray-800 text-white font-bold text-2xl'>사용자의 위치 정보를 가져올 수 없어요.</div> :
      coords ?
        <KakaoMap id={props.id} coords={coords} />
      : null }
    </Fragment>
  )
}