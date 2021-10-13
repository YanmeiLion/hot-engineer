import React from 'react'
import loading from './assets/image/loading.gif'

const App: React.FC = () => {
	return <div>
		<p>Hello,This is pages!</p>
		<img src={loading} alt="" />
	</div>
}

export {
	App
}
