import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'
import { message } from 'antd'
import 'font-awesome/css/font-awesome.css'

import './assets/styles/popular'
import loadingImg from './assets/image/loading.gif'

const title = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS']

function Popular(props) {
  // title
  const [show, setShow] = useState('All')
  const [listData, setListData] = useState([])
  // loading
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  //是否开启下拉加载
  const [hasMore, setHasmore] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    props.history.push(`/popular/language=${show}`)
    getListData()
  }, [])

  useEffect(() => {
    setLoading(true)
    getListData()
  }, [show])

  // 点击切换title
  const changeAcive = item => {
    props.history.push(`/popular/language=${item}`)
    setShow(item)
    setPage(1)
    setCount(0)
    setListData([])
  }
  // 获取数据
  const getListData = async () => {
    let lang = ''
    switch (show) {
      case 'JavaScript':
        lang = 'javascript'
        break
      case 'Ruby':
        lang = 'ruby'
        break
      case 'Java':
        lang = 'java'
        break
      case 'CSS':
        lang = 'css'
        break
      default:
        lang = ''
        break
    }
    let req = `https://api.github.com/search/repositories?q=stars:%3E1${
      lang !== '' ? '+language:' + lang : ''
    }&sort=stars&order=desc&type=Repositories`
    if (count >= 200) {
      setHasmore(false)
    }

    axios
      .get(req, {
        params: { page: page },
      })
      .then(res => {
        if (res.status === 200) {
          const countAll = res.data.items.length + count

          setCount(countAll)
          const data = [...listData, ...res.data.items]
          setListData(data)
          setLoading(false)
        }
      })
      .catch(err => {
        message.error(err.response.data.message)
      })
  }

  // 内容
  const newDiv = listData.map((item, index) => {
    return (
      <div className='productOne' key={index}>
        <span> #{index + 1} </span>
        <div className='titleImg'>
          <img src={item.owner.avatar_url} alt='' />
        </div>
        <p> {item.name} </p>
        <div className='titleInfo'>
          <div>
            <i className='fa fa-user icon1' aria-hidden='true'></i>
            <b>{item.name}</b>
          </div>
          <div>
            <i className='fa fa-star icon2' aria-hidden='true'></i>
            {item.stargazers_count} starts
          </div>
          <div>
            <i className='fa fa-share-alt icon3' aria-hidden='true'></i>
            {item.forks_count} forks
          </div>
          <div>
            <i className='fa fa-exclamation-triangle icon4' aria-hidden='true'></i>
            {item.open_issues_count} open issues
          </div>
        </div>
      </div>
    )
  })

  return (
    <div>
      {/* laoding */}
      {loading ? (
        <div id='loadingDiv'>
          <img src={loadingImg} alt='找不到图片' />
        </div>
      ) : null}

      {/* 标题 */}
      <div className='title'>
        <ul>
          {title.map(item => (
            <li key={item} className={item === show ? 'active' : ''} onClick={() => changeAcive(item)}>
              {' '}
              {item}{' '}
            </li>
          ))}
        </ul>
      </div>

      <InfiniteScroll
        initialLoad={false}
        pageStart={page}
        loadMore={getListData}
        hasMore={hasMore}
        useWindow={true} // 不监听 window 滚动条
        loader={
          <div key={0} style={{ textAlign: 'center', marginBottom: '0' }}>
            正在加载中 Loading...
          </div>
        }
      >
        <div className='mainInfo'>{newDiv}</div>
      </InfiniteScroll>
    </div>
  )
}

export default Popular
