import React from 'react'
import theme from '../styles/theme'
import { Grid, Text } from '../elements'

const ChatListItem = (props) => {
    const {color, border, fontSize} = theme
    const {roomName, roomId, roomImg, _onClick} = props
    return (
        <React.Fragment>
            <Grid
            is_flex4="t"
            padding="1.9rem 2rem"
            borderBottom={border.bg20}
            cursor="t"
            _onClick={_onClick}
          >
            <svg
              style={{ marginRight: "1.2rem" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M22.7274 25.1883C22.2716 23.6998 21.2672 22.3846 19.8701 21.4465C18.4729 20.5085 16.7611 20 15 20C13.2389 20 11.5271 20.5085 10.1299 21.4465C8.73276 22.3846 7.72839 23.6998 7.27259 25.1883"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="15"
                  cy="11"
                  r="5"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <Text color={color.bg100} size={fontSize.base} bold2="400">
              {roomName}
            </Text>
          </Grid>
        </React.Fragment>
    )
}

export default ChatListItem
