import React, {useState, useEffect}from 'react'
import BasicLayout from "../../layout/BasicLayout";
import { Button, Spinner } from "react-bootstrap";
import ListTweets from "../../components/ListTweets";
import { getTweetFollowersApi } from "../../api/tweet";

export default function Home({setRefreshCheckLogin}) {

    const [tweets, setTweets] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingTweets, setLoadingTweets] = useState(false)

    useEffect(() => {
        getTweetFollowersApi(page).then(res => {
            if( !tweets && res ) {
                setTweets(formatModel(res))
            } else {
                if( !res ) {
                    setLoadingTweets(0)
                } else {
                    const data = formatModel(res)
                    setTweets([...tweets, ...data])
                    setLoadingTweets(false)
                }
            }
        })
        .catch(() => {})
    }, [page])

    const moreData = () => {
        setLoadingTweets(true)
        setPage(page + 1)
    }

    return (
        <BasicLayout
            className="home"
            setRefreshCheckLogin={setRefreshCheckLogin}
        >
            <div className='home__title'>
                <h2>Inicio</h2>
            </div>
            {tweets && <ListTweets
                tweets={tweets}
            />}
            <Button
                className="load-more"
                onClick={moreData}
            >
            {!loadingTweets ? (
                loadingTweets !== 0 ? "Obtener más Tweets" : "No hay más tweets"
            ) : (
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            )}
            </Button>
        </BasicLayout>
    )
}

function formatModel(tweets) {
    const tweetsTemp = []
    
    tweets.forEach(tweet => {
        tweetsTemp.push({
            _id : tweet._id,
            userId: tweet.userRelationId,
            mensaje: tweet.Tweet.mensaje,
            fecha: tweet.Tweet.fecha
        })
    });

    return tweetsTemp
}