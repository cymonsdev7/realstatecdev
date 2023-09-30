import styled from "styled-components";

export const Wrapper = styled.section`
   display: flex;
   justify-content: center;
   align-items: center;

   .top-btn{
      font-size: 2.4rem;
      width: 3.2rem;
      height: 3.2rem;
      color: #fff;
      background-color: #3d42c1;
      box-shadow: 3px 2px 3px rgba(0,0,0,0.1);
      border-radius: 50%;
      position: fixed;
      bottom: 3.8rem;
      right: 10rem;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      
      &--icon {
         animation: gototop 1.2s linear infinite alternate-reverse;
      }
   
      @keyframes gototop {
       0% {
           transform: translateY(-0.5rem);
       }
       100% {
           transform: translateY(1rem);
       }
      }
   }


`