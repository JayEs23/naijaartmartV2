import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section className="tf-slider">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <div className="swiper-container slider-home home1">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="slider-item">
                      <div className="tf-slider-item">
                        <div className="content-inner">
                          <h1 className="heading text-light">
                            Tokenize, Tr<span>ade</span>, and Own F<span>ine</span> Art
                            <Image src="/assets/images/slider/bg-slider.png" alt="Background" width={500} height={100} />
                          </h1>
                          <p className="sub-heading text-light">
                            Art Exchange is a modern platform for digital art tokenization, trading, and portfolio management. Investors, artists, and institutions can securely buy, sell, and manage fractionalized art assets with real-time market data.
                          </p>
                          <div className="btn-slider">
                            <a href="/artworks" className="tf-button style-2">Browse Artworks</a>
                            <a href="/artworks/create" className="tf-button style-3">List Your Art</a>
                          </div>
                        </div>
                        <div className="image">
                          <div className="img-slider-main ani5">
                            <Image src="/assets/images/product/product26.jpg" alt="NFT Sample" width={320} height={240} />
                          </div>
                          <Image src="/assets/images/slider/slider-2.png" alt="Decoration" width={150} height={150} className="img-slider-2 ani4" />
                          <Image src="/assets/images/slider/slider-3.png" alt="Decoration" width={150} height={150} className="img-slider-3 ani5" />

                          <div className="current-bid">
                            <div className="title">Current bid</div>
                            <div className="price">1.56 wETH</div>
                          </div>

                          <div className="card-infor ani5">
                            <Image src="/assets/images/author/authorpd14.png" alt="Creator" width={36} height={36} />
                            <div className="inner">
                              <h6 className="name">&ldquo;The Monkey Sad&rdquo;</h6>
                              <p className="author">@SolvadorDali</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}