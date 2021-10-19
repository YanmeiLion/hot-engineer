import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import './assets/styles/result'
import { getPlayerInfoById } from './http/player'

function Result(props) {
  const [playerOneData, setPlayerOneData] = useState()
  const [playerTwoData, setPlayerTwoData] = useState()

  useEffect(async () => {
    const search = new URLSearchParams(location.hash.split('?')[1])
    const player1 = search.has('player1') ? search.get('player1') : ''
    const player2 = search.has('player2') ? search.get('player2') : ''

    if (player1 === '' || player2 === '') {
      message.error('丢失参数，返回battle页')
      props.history.push('/battle')
    }
    const result1 = await getPlayerInfoById(player1)
    setPlayerOneData(result1)

    const result2 = await getPlayerInfoById(player2)
    setPlayerTwoData(result2)
  }, [])

  const judgeWin = (theOne, theTwo) => {
    if (theOne > theTwo) {
      return 'Winner'
    } else if (theOne < theTwo) {
      return 'Loser'
    } else {
      return 'Draw'
    }
  }

  // 返回battle
  const reset = () => {
    props.history.push('/battle')
  }

  return (
    <>
      {playerOneData && playerTwoData && (
        <div className='resultInfo'>
          <div className='resultDiv'>
            <p className='titleWin'> {judgeWin(playerOneData.public_repos, playerTwoData.public_repos)} </p>
            <img src={playerOneData.avatar_url} alt='暂无图片' />
            <p className='score'> Scores: {playerOneData.public_repos} </p>
            <p className='name'> {playerOneData.login} </p>
            <div>
              <i className='fa fa-location-arrow' aria-hidden='true'></i> <br />
              <i className='fa fa-users' aria-hidden='true'></i>
              <span> {playerOneData.followers} </span>
              <br />
              <i className='fa fa-user-plus' aria-hidden='true'></i>
              <span> {playerOneData.public_repos} </span>
              <br />
              <i className='fa fa-code' aria-hidden='true'></i> <br />
            </div>
          </div>

          <div className='resultDiv'>
            <p className='titleWin'> {judgeWin(playerTwoData.public_repos, playerOneData.public_repos)} </p>
            <img src={playerTwoData.avatar_url} alt='暂无图片' />
            <p className='score'> Scores: {playerTwoData.public_repos} </p>
            <p className='name'> {playerTwoData.login} </p>

            <div>
              <i className='fa fa-location-arrow' aria-hidden='true'></i> <br />
              <i className='fa fa-users' aria-hidden='true'></i>
              <span> {playerTwoData.followers} </span>
              <br />
              <i className='fa fa-user-plus' aria-hidden='true'></i>
              <span> {playerTwoData.public_repos} </span>
              <br />
              <i className='fa fa-code' aria-hidden='true'></i> <br />
            </div>
          </div>
        </div>
      )}
      <Button className='btnReset' onClick={reset}>
        {' '}
        Reset{' '}
      </Button>
    </>
  )
}

export default Result
