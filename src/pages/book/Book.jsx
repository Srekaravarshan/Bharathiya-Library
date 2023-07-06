import './Book.css'
import React from 'react'
import { ReactComponent as LinkArrow } from './../../assets/icons/arrow-right-up-line.svg'
import { ReactComponent as BookmarkIcon } from './../../assets/icons/bookmark-line.svg'
import { ReactComponent as ShareIcon } from './../../assets/icons/share-line.svg'
import { ReactComponent as DownloadIcon } from './../../assets/icons/skip-down-line.svg'

function Book() {
  return (
    <div className='bookdetail'>
        <div className="bookdetail__top">
            <img src="\assets\bookcovers\THE LORD OF THE RINGS_ THE FELLOWSHIP OF THE RING, RUIZ BURGOS.png" alt="" className="bookdetail__cover" />
            <div className="bookdetail__meta">
            <div>
                <h1 className="bookdetail__title">
                    Lord Of The Rings: The Fellowship
                </h1>
                <h4 className="bookdetail__heading">JK Rowling</h4>
                <caption className="bookdetail__caption">Get ready to uncover the dark secrets and betrayals in the book. A thrilling adventure awaits you.</caption>
</div>
                <div className="bookdetail__buttons">
                    <button className="button bookdetail__button">Start reading <LinkArrow className='bookdetail__button--icon'/></button>
                    <div className="bookdetail__actions">
                    <BookmarkIcon className='bookdetail__action--icon'/>
                    <ShareIcon className='bookdetail__action--icon'/>
                    <DownloadIcon className='bookdetail__action--icon'/>
                    </div>
                </div>
            </div>
        </div>
        <div className="bookdetail__bottom">
        <div className="bookdetail__left">
            <h4 className="bookdetail__heading">Description</h4>
            <p className='bookdetail__caption'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem enim porro explicabo tenetur minima, veritatis repellat voluptatibus aspernatur, quaerat cupiditate recusandae atque nemo. Aperiam vel eius officiis dicta qui sint.</p>

        </div>
        <div className="bookdetail__right">
            <div className="bookdetail__heading">Editors</div>
            <div className="bookdetail__caption">
                JK Rowling (author), Chrishtopher Reath, Alena
            </div>
            <div className="bookdetail__heading">Language</div>
            <div className="bookdetail__caption">
    English
            </div>
            <div className="bookdetail__heading">Editors</div>
            <div className="bookdetail__caption">
    Paper textured, full colour, 345 pages<br/>
    ISBN 98762345688
            </div>
        </div>
        </div>
    </div>
  )
}

export default Book