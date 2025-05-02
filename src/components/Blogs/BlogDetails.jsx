import React from 'react';
import './style.css';
import check from '../../Assets/Images/blogs/check.svg';
import detailone from '../../Assets/Images/blogs/detail-one.svg';
import detailtwo from '../../Assets/Images/blogs/detail-two.svg';
import Newsletter from '../Home/Newsletter';
const BlogDetails = () => {
  return (
    <div className="blog-details-wrapper display-flex">
      <div className="blogs-banner display-flex">
        <div className="banner-text blog-banner-text">
          <div className="text-upper-border"></div>
          <div className="banner-two-text blog-heading">
            <h2>The Sweet Side of Life – Exploring Desserts</h2>
          </div>
          <div className="text-lower-border"></div>
        </div>
      </div>

      <div className="blog-desc-start ">
        <p className="desc-para">
          Desserts are the heart of celebrations, family gatherings, and moments
          of joy. In Asian culture,they represent tradition, warmth, and love.
          RAASID’s sweet dishes bring these emotions to lifewith authentic
          recipes that are rich, flavorful, and indulgent.
        </p>
        <div className="blog-images display-flex">
          <img src={detailone} alt="one-detail" />
          <img src={detailtwo} alt="two-detail" />
        </div>
        <h3>Why Are Desserts So Special?</h3>
        <div className="ans-blogs">
          <img src={check} alt="check" className="check-in-blog-details" />
          <div>
            <h4>Cultural Significance:</h4>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>
                Desserts like Kheer and Halwa are staples of celebrations and
                festivals.
              </p>
            </div>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>They represent joy, prosperity, and togetherness.</p>
            </div>
          </div>
        </div>
        <div className="ans-blogs">
          <img src={check} alt="check" className="check-in-blog-details" />
          <div>
            <h4>Comfort Food:</h4>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>
                A bowl of warm Gajar ka Halwa or creamy Kheer is perfect for
                cold evenings or special moments.
              </p>
            </div>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>Sweet dishes offer the comfort of home and nostalgia.</p>
            </div>
          </div>
        </div>
        <div className="ans-blogs">
          <img src={check} alt="check" className="check-in-blog-details" />
          <div>
            <h4>Versatile and Delicious:</h4>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>
                Desserts can be enjoyed as a treat after meals or during tea
                time.
              </p>
            </div>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>
                RAASID’s sweet dishes are crafted with traditional methods to
                ensure rich flavors.
              </p>
            </div>
          </div>
        </div>

        <h3>Popular Sweet Dishes to Try</h3>

        <div className="ans-blogs">
          <img src={check} alt="check" className="check-in-blog-details" />
          <div>
            <div className="statement-with-bullet ">
              <p>
                <span className="grn-clr">
                  <strong>Kheer-</strong>
                </span>{' '}
                Made with rice, milk, and cardamom, topped with nuts for added
                richness.
              </p>
            </div>
          </div>
        </div>
        <div className="ans-blogs">
          <img src={check} alt="check" className="check-in-blog-details" />
          <div>
            <div className="statement-with-bullet ">
              <p>
                <span className="grn-clr">
                  <strong>Suji Halwa-</strong>
                </span>{' '}
                warm, buttery delight with the aroma of roasted semolina.
              </p>
            </div>
          </div>
        </div>
        <div className="ans-blogs">
          <img src={check} alt="check" className="check-in-blog-details" />
          <div>
            <div className="statement-with-bullet ">
              <p>
                <span className="grn-clr">
                  <strong>Gajar Halwa- </strong>
                </span>{' '}
                Carrot-based dessert slow-cooked in milk and sugar for a
                heavenly taste.
              </p>
            </div>
          </div>
        </div>

        <h3>Tips for Serving Desserts</h3>

        <div className="ans-blogs">
          <div>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>Serve warm for the best taste.</p>
            </div>
          </div>
        </div>
        <div className="ans-blogs">
          <div>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>
                Garnish with nuts, raisins, or saffron for an elegant touch.
              </p>
            </div>
          </div>
        </div>
        <div className="ans-blogs">
          <div>
            <div className="statement-with-bullet ">
              <div className="bullet-circle"></div>
              <p>Pair with chai or coffee for an indulgent experience.</p>
            </div>
          </div>
        </div>
        <div className="ans-blogs">
          <p>
            With RAASID’s sweet dishes, you don’t just satisfy your sweet
            tooth—you celebrate tradition, love, and life’s special moments.
          </p>
        </div>

        <div className="pst-tags">
          <div className="posted">
            <p>
              <strong>Posted in:</strong>
            </p>
            <div className="cards-post">
              <div className="cont-card2">
                <div className="cont-card">
                  <p>Authentic Taste</p>
                </div>
                <div className="cont-card">
                  <p>RAASID Desserts</p>
                </div>
              </div>
              <div className="cont-card2">
                <div className="cont-card">
                  <p>Comfort Food</p>
                </div>
                <div className="cont-card">
                  <p>Ready To Eat Meals</p>
                </div>
              </div>
            </div>
          </div>
          <div className="vertical-divider"></div>

          <div className="tags">
            <p>
              <strong>Tags:</strong>
            </p>
            <div className="tag">
              <p>#AsianDesserts </p>
              <p>#ComfortFood </p>
            </div>
            <div className="tag">
              <p>#RAASIDDesserts</p>
              <p>#SweetTreats </p>
            </div>

            <p>#TraditionalFlavors</p>
          </div>
        </div>
        <div className="comment-section">
          <h4>Leave a Comment</h4>
          <div className="cmnt-input">
            <div className="name-email">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
            </div>
            <textarea placeholder="Message"></textarea>
          </div>
          <div className="btn-comt">
            {' '}
            <button className="cmnt-btn">Send a Messages</button>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default BlogDetails;
