import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';

export default class Footer extends BaseComponent {
  render() {
    return (
      <footer className=" text-neutral-200 bg-[#222] py-8 mt-16">
        <div className="container mx-auto px-4">
          <a href="https://www.linkedin.com/in/omar-ahmed-sami/">
            <h3 className="flex gap-4 items-center">
              Example of a Simple News Application using ReactOnRails-Redux-ReactRouter-Action Cable and Active Storage with Amazon S3
            </h3>
          </a>
          <a href="https://www.linkedin.com/in/omar-ahmed-sami/">
            <h3 className="flex gap-4 items-center">
              Done by OmarSami@shakacode
            </h3>
          </a>
        </div>
      </footer>
    );
  }
}
