import React from 'react'
import {Link} from 'react-router-dom'

export default function(props) {
    return <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Link to='/base'>标准报表</Link>
        <Link to='/map'>地图</Link>
    </div>
}