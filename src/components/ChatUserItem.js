import React from 'react'
import { Grid, Image, Text } from '../elements'
import theme from '../styles/theme'

const ChatUserItem = (props) => {
    const {fontSize, color} = theme

    return (
        <Grid is_flex4="t" padding="0.8rem 0 0.8rem 2rem">
            <Image></Image>
            <Text padding="0 0.5rem">채팅 성공한 수진</Text>
        </Grid>
    )
}

export default ChatUserItem
