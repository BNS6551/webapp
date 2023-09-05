<script>
import {
  getIsConnected,
  contract_base,
  contract_resolver,
  contract_controller,
  getAccount,
} from "../assets/interface_request";
import {
  register_contract,
  bid_contract,
  getNodeHashes_contract,
  getBNSInfo_contract,
  // getBNS6551s_contract,
  getHighestBid_contract,
  getEndOfYear_contract,
  getTaxRate_contract,
  getMaxPercentage_contract,
  getTokenIdFromNodeHash,
} from "../assets/contract_request";
import { ethers } from "ethers";

export default {
  data() {
    return {
      keyword: "",
      nodes: [],
      cards: [],
      bidAmount: null,
    };
  },
  async mounted() {
    await this.cardInfos();
  },
  computed: {
    isConnected() {
      return getIsConnected().value;
    },
    filteredCards() {
      if (this.cards.length == 0) {
        return [];
      }
      return this.cards.filter((card) =>
        card.name.toLowerCase().includes(this.keyword.toLowerCase())
      );
    },
  },
  created() {
    this.loadCardsPeriodically();
  },
  watch: {
    isConnected(newVal) {
      if (newVal) {
        this.cardInfos();
      }
    },
  },
  methods: {
    shortenAddress(address, len) {
      if (!address || len < 0 || address.length < 2 + len + len + 1) {
        return address;
      }
      return (
        address.substring(0, 2 + len) +
        "..." +
        address.substring(address.length - len, address.length)
      );
    },
    async cardInfos() {
      // console.log(this.isConnected);
      if (this.isConnected) {
        const nodes = await getNodeHashes_contract(contract_base);
        this.nodes = nodes;
        // console.log(nodes);

        const promises = nodes.map(async (node) => {
          const _bns = await getBNSInfo_contract(contract_resolver, node);
          // console.log(_bns);
          const eoaAddress = _bns[0];
          const name = _bns[2];
          const caName = _bns[3];
          const eoaName = _bns[4];
          // const caAddress = await getBNS6551s_contract(contract_base, node);
          const caAddress = _bns[1];
          const _price = await getHighestBid_contract(
            contract_controller,
            await getTokenIdFromNodeHash(contract_resolver, node)
          );
          const price = ethers.formatUnits(_price.toString(), 18);

          const expire = new Date(
            Number(await getEndOfYear_contract(contract_controller)) * 1000
          ).toLocaleString();

          const _taxRate = BigInt(
            await getTaxRate_contract(contract_controller)
          );
          const _maxPercentage = BigInt(
            await getMaxPercentage_contract(contract_controller)
          );
          const tax = Number((_taxRate * BigInt(1e18)) / _maxPercentage) / 1e16; // %

          return {
            name,
            eoaName,
            eoaAddress,
            caName,
            caAddress,
            expire,
            price,
            tax,
          };
        });
        const infos = await Promise.all(promises);

        console.log(infos);
        this.cards = infos;
        // return infos;
      } else {
        // return [];
      }
    },
    async loadCardsPeriodically() {
      // await this.cardInfos();

      setInterval(async () => {
        await this.cardInfos();
        // console.log("reload");
      }, 5000); // Reload every 5000 milliseconds
    },
    async register(name) {
      const resolverAddress = await contract_resolver.getAddress();
      const ownerAddress = getAccount().address;
      console.log(name, ownerAddress, resolverAddress);

      await register_contract(
        contract_controller,
        name,
        ownerAddress,
        resolverAddress
      );
    },
    async placeBid(_index) {
      if (this.bidAmount) {
        console.log("Placing bid of:", this.bidAmount);

        await bid_contract(
          contract_controller,
          await getTokenIdFromNodeHash(contract_resolver, this.nodes[_index]),
          ethers.parseEther(this.bidAmount.toString())
        );
      } else {
        console.log("No bid amount specified");
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <!-- search bar -->
    <input
      class="uk-input uk-form-width-medium uk-form-large"
      type="text"
      placeholder="your web3 username"
      aria-label="Large"
      v-model="keyword"
    />

    <!-- cards -->
    <div>
      <div class="card">
        <!-- <div class="uk-child-width-expand@s uk-text-center" uk-grid> -->
        <div
          class="uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center"
          uk-grid
        >
          <div v-for="(card, index) in filteredCards" :key="index">
            <div class="uk-card uk-card-default uk-width-1-1">
              <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                  <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">
                      {{ card.name }}
                    </h3>
                    <div
                      class="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom"
                    >
                      <div style="text-align: left; margin-left: 30px">
                        <span class="uk-badge bg-green">eoa</span>
                        <span class="uk-badge bg-transparent">{{
                          shortenAddress(card.eoaAddress, 8)
                        }}</span>
                      </div>
                    </div>
                    <div class="uk-text-meta uk-margin-remove-top">
                      <div style="text-align: left; margin-left: 30px">
                        <span class="uk-badge bg-orange">ca</span>
                        <span class="uk-badge bg-transparent">{{
                          shortenAddress(card.caAddress, 8)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="uk-card-body">
                <dl class="uk-description-list">
                  <dt>expire</dt>
                  <dd>{{ card.expire }}</dd>
                </dl>
                <dl class="uk-description-list">
                  <dt>current price</dt>
                  <dd>{{ card.price }} BNB</dd>
                </dl>
                <dl class="uk-description-list">
                  <dt>tax</dt>
                  <dd>{{ card.tax }} %</dd>
                </dl>
              </div>
              <div class="uk-card-footer">
                <ul uk-accordion>
                  <li>
                    <a class="uk-accordion-title" href="#"
                      ><a href="#" class="uk-button uk-button-text"
                        >Bidding</a
                      ></a
                    >
                    <div class="uk-accordion-content">
                      <input
                        class="bidding-input uk-input"
                        type="number"
                        placeholder=""
                        v-model="bidAmount"
                      />
                      <button
                        class="bidding-btn uk-button"
                        @click="placeBid(index)"
                      >
                        bid
                      </button>
                    </div>
                    <a class="uk-accordion-title" href="#"
                      ><img class="down-arrow" src="/down-arrow.svg"
                    /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Create card -->
          <div
            v-if="
              isConnected &&
              keyword != '' &&
              keyword.concat('.opbnb').toLowerCase() !=
                filteredCards[0].name.toLowerCase()
            "
          >
            <div
              class="plus-card uk-card uk-card-default uk-width-1-1"
              uk-tooltip="title: Add username; offset: -130"
              @click="register(keyword)"
            >
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
  height: 305px;
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
