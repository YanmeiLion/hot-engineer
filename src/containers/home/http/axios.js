import axios from "axios";

import { message } from "antd";

const newAxios = axios.create({
	baseURL: 'https://api.github.com'
})


newAxios.interceptors.response.use(config => {
	// 响应成功
	return config.data
}, (err) => {
	// 响应失败
	if (err && err.response && err.response.status) {
		switch (err.response.status) {
			case 404:
				message.error('找不到该条信息')
				break;
			default:
				break;
		}
	}
})


export default newAxios