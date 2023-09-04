<script>
</script>


<template>
  <div class="container">
    <input
      class="uk-input uk-form-width-medium uk-form-large"
      type="text"
      placeholder="Your web3 username"
      aria-label="Large"
    />
    <div>
      <div class="card">
        <div class="uk-child-width-expand@s uk-text-center" uk-grid>
          <div>
            <div class="uk-card uk-card-default uk-width-1-1">
              <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                  <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">luke.eth</h3>
                    <div
                      class="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom"
                    >
                      <span class="uk-badge bg-green">owner</span>
                      <span class="uk-badge bg-transparent">0x123456789abcedf</span>
                    </div>
                    <div class="uk-text-meta uk-margin-remove-top">
                      <span class="uk-badge bg-orange">wallet</span>
                      <span class="uk-badge bg-transparent">0x123456789abcedf</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="uk-card-body">
                <dl class="uk-description-list">
                  <dt>expire</dt>
                  <dd>2028. 01. 15</dd>
                </dl>
                <dl class="uk-description-list">
                  <dt>current price</dt>
                  <dd>1 ETH</dd>
                </dl>
                <dl class="uk-description-list">
                  <dt>tax</dt>
                  <dd>1 ETH</dd>
                </dl>
              </div>
              <div class="uk-card-footer">
                <ul uk-accordion>
                  <li>
                    <a class="uk-accordion-title" href="#"
                      ><a href="#" class="uk-button uk-button-text">Bidding</a></a
                    >
                    <div class="uk-accordion-content">
                      <input
                        class="bidding-input uk-input"
                        type="number"
                        placeholder=""
                      />
                      <button class="bidding-btn uk-button">bid</button>
                    </div>
                    <a class="uk-accordion-title" href="#"
                      ><img class="down-arrow" src="/down-arrow.svg"
                    /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div class="uk-card uk-card-default uk-width-1-1">
              <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                  <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">luke.eth</h3>
                    <div
                      class="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom"
                    >
                      <span class="uk-badge bg-green">owner</span>
                      <span class="uk-badge bg-transparent">0x123456789abcedf</span>
                    </div>
                    <div class="uk-text-meta uk-margin-remove-top">
                      <span class="uk-badge bg-orange">wallet</span>
                      <span class="uk-badge bg-transparent">0x123456789abcedf</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="uk-card-body">
                <dl class="uk-description-list">
                  <dt>expire</dt>
                  <dd>2028. 01. 15</dd>
                </dl>
                <dl class="uk-description-list">
                  <dt>current price</dt>
                  <dd>1 ETH</dd>
                </dl>
                <dl class="uk-description-list">
                  <dt>tax</dt>
                  <dd>1 ETH</dd>
                </dl>
              </div>
              <div class="uk-card-footer">
                <ul uk-accordion>
                  <li>
                    <a class="uk-accordion-title" href="#"
                      ><a href="#" class="uk-button uk-button-text">Bidding</a></a
                    >
                    <div class="uk-accordion-content">
                      <input
                        class="bidding-input uk-input"
                        type="number"
                        placeholder=""
                      />
                      <button class="bidding-btn uk-button">bid</button>
                    </div>
                    <a class="uk-accordion-title" href="#"
                      ><img class="down-arrow" src="/down-arrow.svg"
                    /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div class="plus-card uk-card uk-card-default uk-width-1-1" uk-tooltip="title: Add username; offset: -130">
              <div>
                <img class="plus-icon" src="/plus-icon.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px 50px 20px 50px;
}
.uk-input {
  border-radius: 20px;
  border: 1px solid rgb(223, 223, 223);
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.1s ease-in;
}

.uk-input:focus {
  border: 3px solid rgb(223, 223, 223);
  transition: all 0.1s ease-in;
}
.uk-form-width-medium {
  width: 100%;
}

.card {
  padding: 20px 0px 20px 0px;
}
.uk-card {
  border-radius: 20px;
}
.uk-card-header {
  display: flow-root;
  padding: 20px 40px;
}
.uk-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #424242;
}
.uk-card-body {
  padding: 20px;
  font-size: 0.9rem;
}

.uk-card-footer {
  padding: 20px 20px 23px 20px;
}
.uk-accordion-title {
  font-size: 0.9rem;
}
.uk-accordion-content {
  margin: 0;
  padding-top: 15px;
  padding-bottom: 10px;
}
.uk-badge {
  font-size: 0.8rem;
  min-width: 50px;
}

.bg-transparent {
  background: transparent;
  color: #999 !important;
}
.bg-green {
  background: #32d296;
  color: white !important;
}
.bg-grey {
  background: #999;
  color: white !important;
}
.bg-orange {
  background: #faa05a;
  color: white !important;
}

.bidding-input {
  width: 100px;
  border-radius: 0px 0px 0px 0px;
}

.bidding-btn {
  width: 50px;
  padding: 0px;
  color: #6f6f6f94;
  border-radius: 0px 0px 0px 0px;
  background: white;
  border: 1px solid rgb(223, 223, 223);
  border-left: 0px solid;
}

.bidding-btn:hover {
  background: rgba(223, 223, 223, 0.508);
  transition: background-color 0.2s;
}

.down-arrow {
  width: 10px;
}

.plus-card {
  height: 305.41px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.plus-icon {
  width: 25px;
  opacity: 0.8;
}

.plus-card:hover {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

@keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}

.uk-open .down-arrow {
  animation: rotate 0.2s ease 0s 1 normal forwards;
}

dt {
  display: inline;
  padding-right: 10px;
  font-size: 0.8rem;
  font-weight: 500;
}

dd {
  display: inline;
  font-size: 0.8rem;
}

dl {
  margin: 0px;
}
</style>
