import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function PageLoader (props) {
  return (
    <div className='pageloader'>
      <Loader
        type={props.type || 'Bars'}
        color={props.color || '#0D9730'}
        height={props.height || 40}
        width={props.width || 40}
        timeout={!props.timeout ? 0 : props.timeout}
      />
    </div>
  )
}

PageLoader.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  timeout: PropTypes.number,
  type: PropTypes.string,
  width: PropTypes.number
}

export default PageLoader
