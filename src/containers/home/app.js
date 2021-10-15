import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import 'antd/dist/antd.css'

import './assets/styles/index'

// 定义一个动画组件,在路由很慢的情况下执行这个动画
class Loading extends Component {
	render() {
		return <div>加载中...</div>
	}
}


function App() {
	return (
		<div>
			<div className='banner'>
				<NavLink to='/popular'> Popular </NavLink> &nbsp;&nbsp;
				<NavLink to='/battle'> Battle </NavLink>
			</div>

			{/* 内容区域 */}
			<div className='main'>
				<React.Suspense fallback={<Loading></Loading>}>
					<Switch>
						<Route path='/popular' component={React.lazy(() => import('./popular'))} />
						<Route path='/battle' component={React.lazy(() => import('./battle'))} />						
						<Route exact path='/' component={React.lazy(() => import('./popular'))} />
					</Switch>
				</React.Suspense>
			</div>

			<footer>
				版权所有 &copy; ICU
			</footer>

		</div>
	)
}

export {
	App
}
