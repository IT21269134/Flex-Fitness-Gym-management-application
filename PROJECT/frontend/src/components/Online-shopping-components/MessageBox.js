import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from 'react-bootstrap/Alert';
function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}

export default MessageBox
