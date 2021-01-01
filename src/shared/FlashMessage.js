import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function FlashMessage() {
   const [show, setShow] = React.useState(true);
   return (
      <>
         {show && (
            <Modal
               scrollable={true}
               show={show}
               onHide={() => setShow(false)}
               style={{ backgroundColor: "rgb(0,0,0, .2" }}
            >
               <Modal.Header closeButton></Modal.Header>
               <Modal.Body>
                  <div className="col-sm-8 text-center mx-auto h4">
                     Please take 5 seconds to login to access everything.
                  </div>
                  <div className="lead text-justify col-sm-10 mx-auto mb-5">
                     This website is under development. In this website you can create a
                     diary in the <Link to="/posts">Home</Link> page. Existing post by all
                     the users are provided below and below the home page. You can also
                     view the detail of the post by following the{" "}
                     <Link to="/posts">"View"</Link> link. Also, you can preform delete
                     and update if you are the author of the post. You are not allowed to
                     access some page if you are not authenticate.
                     <p className="d-flex justify-content-end">
                        - casianojrfernandez@gmail.com
                     </p>
                  </div>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="outline-success" onClick={() => setShow(false)}>
                     Gotcha!
                  </Button>
               </Modal.Footer>
            </Modal>
         )}
      </>
   );
}
