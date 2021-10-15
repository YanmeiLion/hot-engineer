import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import './assets/styles/battle'
import 'font-awesome/css/font-awesome.css'
import { Button } from "antd";
import { getData } from './http/player'

function Battle(props) {
	const [playerOne, setPlayerOne] = useState('')
	const [playerTwo, setPlayerTwo] = useState('')
	const [submitOne, setSubmitOne] = useState(false)
	const [submitTwo, setSubmitTwo] = useState(false)

	const [imgOne, setImgOne] = useState('')
	const [imgTwo, setImgTwo] = useState('')

	const [showBattle, setShowBattle] = useState(false)  // battle是否显示


	useEffect(() => {
		if (submitOne && submitTwo) {
			setShowBattle(true)
		}
	}, [submitOne, submitTwo])

	// 获取player信息
	const checkPlayerOne = async () => {
		const result = await getData(playerOne)
		if (result) {
			setImgOne(result.avatar_url)
			setSubmitOne(true)
		} else {
			setPlayerOne('')
		}
	}
	const checkPlayerTwo = async () => {
		const result = await getData(playerTwo)
		if (result) {
			setImgTwo(result.avatar_url)
			setSubmitTwo(true)
		} else {
			setPlayerTwo('')
		}
	}

	// 输入player信息
	const changeInputOne = (e) => {
		setPlayerOne(e.target.value)
	}
	const changeInputTwo = (e) => {
		setPlayerTwo(e.target.value)
	}
	// 删除player
	const deletePlayerOne = () => {
		setSubmitOne(false)
		setPlayerOne('')
		setShowBattle(false)
	}
	const deletePlayerTwo = () => {
		setSubmitTwo(false)
		setPlayerTwo('')
		setShowBattle(false)
	}

	// battle 结果显示
	const toResult = () => {
		props.history.push(`/battle/result?player1=${playerOne}&player2=${playerTwo}`)
	}


	return (
		<div className='batMain'>
			<Switch>
				<Route path='/battle/result' component={React.lazy(() => import('./result'))} />

				<>
					<p className='title'> Instructions </p>
					<div className='instruction'>
						<div className='info'>
							<div>
								<p> Enter two Github </p>
								<i className="fa fa-users" aria-hidden="true"></i>
							</div>
							<div>
								<p> Battle </p>
								<i className="fa fa-fighter-jet" aria-hidden="true"></i>
							</div>
							<div>
								<p> See the winner </p>
								<i className="fa fa-trophy" aria-hidden="true"></i>
							</div>
						</div>
					</div>

					{/* palyer */}
					<p className='title2'> Player </p>

					<div className='palyer'>
						<div>
							<p> Player One </p>
							{
								submitOne ?
									<div className='showInfo'>
										<img src={imgOne} alt='暂无图片' />
										<span> {playerOne} </span>
										<i className="fa fa-times delete" aria-hidden="true"
											onClick={deletePlayerOne}></i>
									</div>
									:
									<div className='info'>
										<input placeholder='github username'
											onChange={(e) => changeInputOne(e)} value={playerOne}
										/>
										<Button disabled={playerOne !== '' ? false : true} onClick={checkPlayerOne}>
											submit
										</Button>
									</div>
							}
						</div>

						<div>
							<p> Player Two </p>
							{
								submitTwo ?
									<div className='showInfo'>
										<img src={imgTwo} alt='暂无图片' />
										<span> {playerTwo} </span>
										<i className="fa fa-times delete" aria-hidden="true"
											onClick={deletePlayerTwo}></i>
									</div>
									:
									<div className='info'>
										<input placeholder='github username'
											onChange={(e) => changeInputTwo(e)} value={playerTwo}
										/>
										<Button disabled={playerTwo !== '' ? false : true} onClick={checkPlayerTwo}>
											submit
										</Button>
									</div>
							}
						</div>
					</div>

					{
						showBattle ? <Button className='battle' onClick={toResult}> battle </Button> : null
					}
				</>
			</Switch>
		</div>

	)
}

export default withRouter(Battle)

