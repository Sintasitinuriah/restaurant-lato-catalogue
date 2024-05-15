class CustomFooter extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Define the content of the custom element
    this.shadowRoot.innerHTML = `
        <style>
          .wrapper {
            min-width: 300px;
            padding: 2px;
            background-color: #ffffff;
            box-shadow: 0px 0px 1px 0px #000000;
            text-align: center;
          }
          .foot-information {
            margin: 5px 0;
            font-size: 14px;
          }
        </style>
          <div class="wrapper">
            <p class="foot-information">Laris Resto</p>
            <p class="foot-information">Copyright &copy; 2024 || SINTA SITI NURIAH</p>
          </div
      `;
  }
}

customElements.define('footer-bar', CustomFooter);
