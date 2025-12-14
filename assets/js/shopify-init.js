/**
 * Centralized Shopify Buy Button Initialization
 * Vino Arsan - Shop & Limited Releases
 */

// Shopify Configuration
const SHOPIFY_CONFIG = {
    domain: 'vino-arsan-2.myshopify.com',
    storefrontAccessToken: 'a85d0da9e9fbe12f67e8fd5d6f4aa47f',
    moneyFormat: '%E2%82%B1%7B%7Bamount%7D%7D'
};

// Shop Page Products (Regular wines with red theme)
const SHOP_PRODUCTS = [
    { id: '8162473148450', containerId: 'product-component-1765469425904' },     // Malibugold Medium Sweet
    { id: '8162473181218', containerId: 'product-component-1765469338020' },     // Malibugold Medium Dry
    { id: '8162433728546', containerId: 'product-component-1765464924746' },     // Bignay Pitaya
    { id: '8162473213986', containerId: 'product-component-1765468384103' },     // Calamansi
    { id: '8162473246754', containerId: 'product-component-1765469447150' },     // Mango
    { id: '8162433925154', containerId: 'product-component-1765469006136' },     // Dragonfruit
    { id: '8162433990690', containerId: 'product-component-1765469095232' },     // Honey Wine
    { id: '8162473312290', containerId: 'product-component-1765469121501' },     // Lipote Bugnay Semi-Dry
    { id: '8162473345058', containerId: 'product-component-1765469235285' },     // Lipote Bugnay Semi-Sweet
    { id: '8162473377826', containerId: 'product-component-1765469279179' },     // Lipote Dry
    { id: '8162434220066', containerId: 'product-component-1765469471937' },     // Mescolare Sangria
    { id: '8162434252834', containerId: 'product-component-1765469498168' },     // Mulberry Wine
    { id: '8162434285602', containerId: 'product-component-1765469526239' },     // Rambutan Wine
    { id: '8162434318370', containerId: 'product-component-1765469547800' },     // Watermelon Wine
    { id: '8162434351138', containerId: 'product-component-1765469034637' }      // Guyabano Wine
];

// Limited Releases Page Products (Spirits with gold theme)
const LIMITED_PRODUCTS = [
    { id: '8162473410594', containerId: 'product-component-1765468771524' },     // Lolo Art Whiskey
    { id: '8162473443362', containerId: 'product-component-1765468882369' },     // Lolo Art Brandy
    { id: '8162473508898', containerId: 'product-component-1765468817586' },     // Lolo Art Gin
    { id: '8162434547746', containerId: 'product-component-1765468711143' },     // Chocolate Liquor
    { id: '8162434580514', containerId: 'product-component-1765468691192' }      // Coffee Liquor
];

// Shared style configuration for regular shop products (red theme)
const SHOP_STYLES = {
    product: {
        styles: {
            product: {
                'background-color': '#f1ebe1',
                'padding-bottom': '20px',
                '@media (min-width: 601px)': {
                    'max-width': 'calc(25% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '50px'
                }
            },
            button: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#f1ebe1',
                ':hover': {
                    'color': '#f1ebe1',
                    'background-color': '#9c2f38'
                },
                'background-color': '#ad343e',
                ':focus': {
                    'background-color': '#9c2f38'
                },
                'border-radius': '25px'
            }
        },
        buttonDestination: 'modal',
        contents: {
            options: false
        },
        text: {
            button: 'View Product'
        },
        googleFonts: ['Open Sans']
    },
    productSet: {
        styles: {
            products: {
                '@media (min-width: 601px)': {
                    'margin-left': '-20px'
                }
            }
        }
    },
    modalProduct: {
        contents: {
            img: false,
            imgWithCarousel: true,
            button: false,
            buttonWithQuantity: true
        },
        styles: {
            product: {
                'background-color': '#f1ebe1',
                'padding-bottom': '20px',
                '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px'
                }
            },
            button: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#f1ebe1',
                ':hover': {
                    'color': '#f1ebe1',
                    'background-color': '#9c2f38'
                },
                'background-color': '#ad343e',
                ':focus': {
                    'background-color': '#9c2f38'
                },
                'border-radius': '25px'
            },
            title: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            price: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            compareAt: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            unitPrice: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            description: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            }
        },
        googleFonts: ['Open Sans'],
        text: {
            button: 'Add to cart'
        }
    },
    modal: {
        styles: {
            modal: {
                'background-color': '#f1ebe1'
            }
        }
    },
    option: {},
    cart: {
        styles: {
            button: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#f1ebe1',
                ':hover': {
                    'color': '#f1ebe1',
                    'background-color': '#9c2f38'
                },
                'background-color': '#ad343e',
                ':focus': {
                    'background-color': '#9c2f38'
                },
                'border-radius': '25px'
            },
            title: { 'color': '#2c2420' },
            header: { 'color': '#2c2420' },
            lineItems: { 'color': '#2c2420' },
            subtotalText: { 'color': '#2c2420' },
            subtotal: { 'color': '#2c2420' },
            notice: { 'color': '#2c2420' },
            currency: { 'color': '#2c2420' },
            close: {
                'color': '#2c2420',
                ':hover': { 'color': '#2c2420' }
            },
            empty: { 'color': '#2c2420' },
            noteDescription: { 'color': '#2c2420' },
            discountText: { 'color': '#2c2420' },
            discountIcon: { 'fill': '#2c2420' },
            discountAmount: { 'color': '#2c2420' },
            cart: { 'background-color': '#f1ebe1' },
            footer: { 'background-color': '#f1ebe1' }
        },
        text: {
            total: 'Subtotal',
            button: 'Checkout'
        },
        popup: false,
        googleFonts: ['Open Sans']
    },
    toggle: {
        styles: {
            toggle: {
                'font-family': 'Open Sans, sans-serif',
                'background-color': '#ad343e',
                ':hover': { 'background-color': '#9c2f38' },
                ':focus': { 'background-color': '#9c2f38' }
            },
            count: {
                'color': '#f1ebe1',
                ':hover': { 'color': '#f1ebe1' }
            },
            iconPath: { 'fill': '#f1ebe1' }
        },
        googleFonts: ['Open Sans']
    },
    lineItem: {
        styles: {
            variantTitle: { 'color': '#2c2420' },
            title: { 'color': '#2c2420' },
            price: { 'color': '#2c2420' },
            fullPrice: { 'color': '#2c2420' },
            discount: { 'color': '#2c2420' },
            discountIcon: { 'fill': '#2c2420' },
            quantity: { 'color': '#2c2420' },
            quantityIncrement: {
                'color': '#2c2420',
                'border-color': '#2c2420'
            },
            quantityDecrement: {
                'color': '#2c2420',
                'border-color': '#2c2420'
            },
            quantityInput: {
                'color': '#2c2420',
                'border-color': '#2c2420'
            }
        }
    }
};

// Limited releases styles (gold theme)
const LIMITED_STYLES = {
    product: {
        styles: {
            product: {
                'background-color': '#f1ebe1',
                'padding-bottom': '20px',
                '@media (min-width: 601px)': {
                    'max-width': 'calc(25% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '50px'
                }
            },
            button: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a',
                ':hover': {
                    'color': '#1a1a1a',
                    'background-color': '#b3883e'
                },
                'background-color': '#c79745',
                ':focus': {
                    'background-color': '#b3883e'
                },
                'border-radius': '25px'
            }
        },
        buttonDestination: 'modal',
        contents: {
            options: false
        },
        text: {
            button: 'View Product'
        },
        googleFonts: ['Open Sans']
    },
    productSet: {
        styles: {
            products: {
                '@media (min-width: 601px)': {
                    'margin-left': '-20px'
                }
            }
        }
    },
    modalProduct: {
        contents: {
            img: false,
            imgWithCarousel: true,
            button: false,
            buttonWithQuantity: true
        },
        styles: {
            product: {
                'background-color': '#f1ebe1',
                'padding-bottom': '20px',
                '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px'
                }
            },
            button: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a',
                ':hover': {
                    'color': '#1a1a1a',
                    'background-color': '#b3883e'
                },
                'background-color': '#c79745',
                ':focus': {
                    'background-color': '#b3883e'
                },
                'border-radius': '25px'
            },
            title: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            price: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            compareAt: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            unitPrice: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            },
            description: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a'
            }
        },
        googleFonts: ['Open Sans'],
        text: {
            button: 'Add to cart'
        }
    },
    modal: {
        styles: {
            modal: {
                'background-color': '#1a1a1a'
            }
        }
    },
    option: {},
    cart: {
        styles: {
            button: {
                'font-family': 'Open Sans, sans-serif',
                'color': '#1a1a1a',
                ':hover': {
                    'color': '#1a1a1a',
                    'background-color': '#b3883e'
                },
                'background-color': '#c79745',
                ':focus': {
                    'background-color': '#b3883e'
                },
                'border-radius': '25px'
            },
            title: { 'color': '#2c2420' },
            header: { 'color': '#2c2420' },
            lineItems: { 'color': '#2c2420' },
            subtotalText: { 'color': '#2c2420' },
            subtotal: { 'color': '#2c2420' },
            notice: { 'color': '#2c2420' },
            currency: { 'color': '#2c2420' },
            close: {
                'color': '#2c2420',
                ':hover': { 'color': '#2c2420' }
            },
            empty: { 'color': '#2c2420' },
            noteDescription: { 'color': '#2c2420' },
            discountText: { 'color': '#2c2420' },
            discountIcon: { 'fill': '#2c2420' },
            discountAmount: { 'color': '#2c2420' },
            cart: { 'background-color': '#f1ebe1' },
            footer: { 'background-color': '#f1ebe1' }
        },
        text: {
            total: 'Subtotal',
            button: 'Checkout'
        },
        popup: false,
        googleFonts: ['Open Sans']
    },
    toggle: {
        styles: {
            toggle: {
                'font-family': 'Open Sans, sans-serif',
                'background-color': '#c79745',
                ':hover': { 'background-color': '#b3883e' },
                ':focus': { 'background-color': '#b3883e' }
            },
            count: {
                'color': '#1a1a1a',
                ':hover': { 'color': '#1a1a1a' }
            },
            iconPath: { 'fill': '#1a1a1a' }
        },
        googleFonts: ['Open Sans']
    },
    lineItem: {
        styles: {
            variantTitle: { 'color': '#2c2420' },
            title: { 'color': '#2c2420' },
            price: { 'color': '#2c2420' },
            fullPrice: { 'color': '#2c2420' },
            discount: { 'color': '#2c2420' },
            discountIcon: { 'fill': '#2c2420' },
            quantity: { 'color': '#2c2420' },
            quantityIncrement: {
                'color': '#2c2420',
                'border-color': '#2c2420'
            },
            quantityDecrement: {
                'color': '#2c2420',
                'border-color': '#2c2420'
            },
            quantityInput: {
                'color': '#2c2420',
                'border-color': '#2c2420'
            }
        }
    }
};

// Initialize products function
function initializeShopifyProducts(products, styles) {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
        } else {
            loadScript();
        }
    } else {
        loadScript();
    }

    function loadScript() {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
    }

    function ShopifyBuyInit() {
        const client = ShopifyBuy.buildClient({
            domain: SHOPIFY_CONFIG.domain,
            storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken
        });

        ShopifyBuy.UI.onReady(client).then(function (ui) {
            products.forEach(function(product) {
                const node = document.getElementById(product.containerId);
                if (node) {
                    ui.createComponent('product', {
                        id: product.id,
                        node: node,
                        moneyFormat: SHOPIFY_CONFIG.moneyFormat,
                        options: styles
                    });
                }
            });
        });
    }
}

// Auto-initialize based on page
document.addEventListener('DOMContentLoaded', function() {
    // Detect which page we're on by checking for specific containers
    const isShopPage = document.getElementById('product-component-1765469425904') !== null;
    const isLimitedPage = document.getElementById('product-component-1765468771524') !== null;

    if (isShopPage) {
        initializeShopifyProducts(SHOP_PRODUCTS, SHOP_STYLES);
    } else if (isLimitedPage) {
        initializeShopifyProducts(LIMITED_PRODUCTS, LIMITED_STYLES);
    }
});
