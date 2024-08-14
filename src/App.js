import logo from './assets/images/My_LOGO.png';
import logoFace from './assets/images/My_LOGO_FINAL-for_DECALS.png';
import portal from './assets/images/PORTAL.png'
import resume from './assets/images/LANUSGA_JEL_CV.pdf';
import './App.css';
import Typewriter from 'typewriter-effect';

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./../node_modules/jquery/dist/jquery.min.js";

// var $ = require( "jquery" );

function App() {

  return (
    <div className="App site-wrapper">
      <div className='cover-container'>
        <div className="masthead clearfix">
          <div className="inner">
            <h3 className="masthead-brand navbar-brand">
              <a href="#" className='navbar-brand p-0 me-0 me-lg-2'>
              <img 
              src={logo} 
              style={{
                height: 100,
                width: 145
              }}
              />
              </a>
            </h3>
            <nav style={{
              position: "relative",
              marginTop: "1%",
              textAlign: "center",
            }}>
              <ul className="nav masthead-nav" style={{textDecoration: "none !important"}}>
                <li className="marker">
                  <a href="#">Work</a>
                </li>
                <li className="marker"><a href="#">About</a></li>
                <li className="marker"><a href="#">Playlist</a></li>
                <li className="marker"><a href="#">Socials</a></li>
                <li className="marker"><a href="#">Product</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="App-body col-md-4 mx-auto text-center">
          <div className='image-stack'>
            <img className="image-stack__item--top" style={{height:"20rem"}} src={logoFace} alt="logoFace" />
          </div>
          <div className="inner cover">
              <h1 className="cover-heading">
              <Typewriter className="Type-writer"
              options={{
                strings: [
                  '[h.e.l.l.o]', 
                  '<span style="font-size: calc(1.375rem + 1.5vw) !important;">[john emman lanusga]'],
                autoStart: true,
                loop: true,
                // cursor: '~',
                cursorClassName: 'cusorSize'
              }}
              /><br />
              </h1>

              <div className="lead">
              <a
                className="App-link"
                href="https://www.linkedin.com/in/jelanusga/"
                target="_blank"
                rel="noopener noreferrer"
              ><i className="arrow right"></i>
                linkedin
              </a>
              <a
                className="App-link"
                href="https://www.facebook.com/emmaniy0"
                target="_blank"
                rel="noopener noreferrer"
              ><i className="arrow right"></i>
                facebook
              </a>
              <a
                className="App-link"
                href="https://www.instagram.com/garu_emani/"
                target="_blank"
                rel="noopener noreferrer"
              ><i className="arrow right"></i>
                instagram
              </a>
              </div>

              <p className="lead">
                <a href={resume} target="_blank" rel="noreferrer" className="btn btn-lg btn-default">View Resume</a>
              </p>
          </div>
        </div>

        <div className="App-body col-md-6 mx-auto text-center" style={{color: "black"}}>
            <div className="inner-cover">
              <img className="App-logo image-stack__item--bottom" src={portal} style={{backgroundImage: {portal}}}  alt="portal" />
              <div className='col-md-8 mx-auto text-center' style={{color: "black"}}>
                <h1 className='mb-3 fw-semibold lh-1'>   
                  Hola — I'm a Philippine based QA Analyst. I ensure software quality and optimize user experiences.
                </h1>
                <p className="lead mb-4">
                With a diverse background, I bring a unique blend of skills to the table. As a Salesforce Test Analyst and Certified Salesforce Administrator, I've honed my ability to ensure software quality and optimize user experience.
                </p>
              </div>
            </div>
        </div>
        
        <h1 className='mb-3 fw-semibold lh-1' style={{color: "black"}}>2019 Project — Game Development and Design Class</h1>
        <iframe
        style={{
          borderRadius:"12px",
          width:"70%",
          height: "50rem",
          frameBorder: "0",
          top: "0", left: "0",
          position: "relative",
          border: "0",
          paddingBottom: "5rem"
        }}
         title='Kada Tipon'
         allow="fullscreen; autoplay; encrypted-media" 
         src="https://games.construct.net/67490/latest" 
         allowFullScreen={true} 
         msallowfullscreen="true" 
         ozallowfullscreen="true" 
         webkitallowfullscreen="true" 
         allowpaymentrequest="false" 
         eferrerpolicy="unsafe-url" 
         sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups" 
         scrolling="no">
         </iframe>

        {/* 
          $$$$$$$\  $$\        $$$$$$\ $$\     $$\ $$\       $$$$$$\  $$$$$$\ $$$$$$$$\ 
          $$  __$$\ $$ |      $$  __$$\\$$\   $$  |$$ |      \_$$  _|$$  __$$\\__$$  __|
          $$ |  $$ |$$ |      $$ /  $$ |\$$\ $$  / $$ |        $$ |  $$ /  \__|  $$ |   
          $$$$$$$  |$$ |      $$$$$$$$ | \$$$$  /  $$ |        $$ |  \$$$$$$\    $$ |   
          $$  ____/ $$ |      $$  __$$ |  \$$  /   $$ |        $$ |   \____$$\   $$ |   
          $$ |      $$ |      $$ |  $$ |   $$ |    $$ |        $$ |  $$\   $$ |  $$ |   
          $$ |      $$$$$$$$\ $$ |  $$ |   $$ |    $$$$$$$$\ $$$$$$\ \$$$$$$  |  $$ |   
          \__|      \________|\__|  \__|   \__|    \________|\______| \______/   \__|   
        */}

        {/* <div className="App-body col-md-8 mx-auto text-center">
          <h1 className='mb-3 fw-semibold lh-1' style={{color: "black"}}>Rick and Morty Playlist</h1>
            <iframe 
              style={{
                borderRadius:"12px",
                width:"100%",
                height: "50rem",
                frameBorder: "0",
                top: "0", left: "0",
                position: "relative",
                border: "0"
              }} 
              src="https://open.spotify.com/embed/playlist/3tuJ1KBhbGCSpXzhxHCWqL?utm_source=generator" 
              allowfullscreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy">
            </iframe>
        </div> */}
  
      <div className="mastfoot">
            <div className="inner">
              <p>Portfolio <a href="/">site</a> of <a href="mailto:emmanlanusga@gmail.com">emmanlanusga@gmail.com</a>.</p>
            </div>
      </div>
      </div>
    </div>
  );
}


//  $$$$$$$\  $$$$$$\                                          
//  \_  _$$ |$$  __$$\                                         
//       $$ |$$ /  $$ |$$\   $$\  $$$$$$\   $$$$$$\  $$\   $$\ 
//       $$ |$$ |  $$ |$$ |  $$ |$$  __$$\ $$  __$$\ $$ |  $$ |
// $$\   $$ |$$ |  $$ |$$ |  $$ |$$$$$$$$ |$$ |  \__|$$ |  $$ |
// $$ |  $$ |$$ $$\$$ |$$ |  $$ |$$   ____|$$ |      $$ |  $$ |
// \$$$$$$  |\$$$$$$ / \$$$$$$  |\$$$$$$$\ $$ |      \$$$$$$$ |
//  \______/  \___$$$\  \______/  \_______|\__|       \____$$ |
//                \___|                              $$\   $$ |
//                                                   \$$$$$$  |
//                                                    \______/ 

// function jQuery() {
//   var markers = $(".marker"); // marker selector
//   var widthGain = 1; // 1 default
//   var heightGain = 1; // 1 default

//   // repeat for all markers
//   markers.each(function () {
//     // Define variables
//     var marker = $(this),
//       width = marker.width(),
//       height = 2 * marker.height(),
//       ns = "http://www.w3.org/2000/svg";

//     // if the svg element doesn't exist, create it
//     var svg = document.createElementNS(ns, "svg");

//     // Also providing attrs for width and height of the svg element
//     $(svg)
//       .css({
//         width: width,
//         height: height,
//         transform:
//           "scale(" + (2 * widthGain * width) / height + "," + heightGain + ")"
//       })
//       .attr({
//         width: width,
//         height: height,
//         viewBox: "-1 -1 2 2"
//       });

//     // attach it to the marker element
//     marker[0].appendChild(svg);

//     // create the path element
//     var path = document.createElementNS(ns, "path");
    
//     // Set path attributes and styles
//       $(path)
//         .attr({
//           pathLength: 100,
//           "vector-effect": "non-scaling-stroke"
//         })
//     svg.appendChild(path);

//     // when creating the element the offset is initialized, however, because of the transition we have to hide it untill it disappears
//     setCircle(false);
//     setCircle(false);

//     // generate a new circle and show path on mouse hover
//     marker.mouseover(function () {
//       setCircle(true);
//     });

//     // this function handles path drawing, it uses the circlePath() function that has tunable inputs - see the codePen https://codepen.io/spencerthayer/pen/nhjwu on how to tune them
//     function setCircle(show_element) {
//       if (show_element) {
//         $(path).css("visibility", "visible");
//       } else {
//         $(path).css("visibility", "hidden");
//       }
      
//       var pathLength = 1000 * path.getTotalLength();
      
//       // Set path attributes and styles
//       $(path)
//         .attr({
//           d: circlePath(-0.15,0.05,150,190,0.05,0.3)
//       })
//         .attr({
//           "stroke-dasharray": pathLength,
//           "stroke-dashoffset": pathLength
//         });
//     }

//     // generates a circle path - see https://codepen.io/spencerthayer/pen/nhjwu
//     function circlePath(dr_min, dr_max, θ0_min, θ0_max, dθ_min, dθ_max) {
//       var c = 0.551915024494,
//         β = Math.atan(c),
//         d = Math.sqrt(c * c + 1 * 1),
//         r = 0.9,
//         θ = ((θ0_min + Math.random() * (θ0_max - θ0_min)) * Math.PI) / 180,
//         path = "M";

//       path += [r * Math.sin(θ), r * Math.cos(θ)];
//       path += " C" + [d * r * Math.sin(θ + β), d * r * Math.cos(θ + β)];

//       for (var i = 0; i < 4; i++) {
//         θ += (Math.PI / 2) * (1 + dθ_min + Math.random() * (dθ_max - dθ_min));
//         r *= 1 + dr_min + Math.random() * (dr_max - dr_min);
//         path +=
//           " " +
//           (i ? "S" : "") +
//           [d * r * Math.sin(θ - β), d * r * Math.cos(θ - β)];
//         path += " " + [r * Math.sin(θ), r * Math.cos(θ)];
//       }
//       return path;
//     }
//   });
// };

export default App;
