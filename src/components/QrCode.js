import React from 'react'
import qrcode from '../img/qrcode.png'

function QrCode(props) {
  return (
    <div className={'qrcode-mask'}>
      <div className={'qrcode-wrapper'}>
        <img src={qrcode} alt={''}/>
        <div className={'qrcode-desc'}>扫描二维码👆<br/>在手机上使用体验更佳✨</div>
      </div>
    </div>
  )
}

export default QrCode