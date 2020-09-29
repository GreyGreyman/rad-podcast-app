import React, { useEffect, useRef } from 'react';

const Player = React.memo(({ title = 'nothing!', link = '' }) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (link !== '') {
      audioRef.current.play()
    }
  }, [link])

  return (
    <div className='player'>
      <p className='player__episode-name'>Now playing: {title}</p>
      <audio ref={audioRef} src={link} controls>
      </audio>
    </div>
  )
})

export default Player;