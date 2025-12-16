/**
 * Centralized Shopify Buy Button Initialization
 * Vino Arsan - Shop & Limited Releases
 */

// Shopify Configuration
const SHOPIFY_CONFIG = {
    domain: 'vino-arsan-wines.myshopify.com',
    storefrontAccessToken: '8d05e526d4b10cadc6498ed1021a4ee2',
    moneyFormat: '%E2%82%B1%7B%7Bamount%7D%7D'
};

// Shop Page Products (Regular wines with red theme)
const SHOP_PRODUCTS = [
    { id: '15438704279625', containerId: 'product-component-1765816272421' },     // Malibugold Medium Sweet
    { id: '15438704312393', containerId: 'product-component-1765816443654' },     // Malibugold Medium Dry
    { id: '15438704345161', containerId: 'product-component-1765816043174' },     // Bignay Pitaya
    { id: '15438704377929', containerId: 'product-component-1765816634996' },     // Calamansi
    { id: '15438704410697', containerId: 'product-component-1765816710916' },     // Mango
    { id: '15438704443465', containerId: 'product-component-1765816767567' },     // Dragonfruit
    { id: '15438704509001', containerId: 'product-component-1765816823931' },     // Honey Wine
    { id: '15438704574537', containerId: 'product-component-1765816896564' },     // Lipote Bugnay Semi-Dry
    { id: '15438704640073', containerId: 'product-component-1765816938144' },     // Lipote Dry
    { id: '15438704672841', containerId: 'product-component-1765816984831' },     // Mescolare Sangria
    { id: '15438704705609', containerId: 'product-component-1765817021817' },     // Mulberry Wine
    { id: '15438704738377', containerId: 'product-component-1765817058266' },     // Rambutan Wine
    { id: '15438704771145', containerId: 'product-component-1765817086746' },     // Watermelon Wine
    { id: '15438704803913', containerId: 'product-component-1765817117147' }      // Guyabano Wine
];

// Limited Releases Page Products (Spirits with gold theme)
const LIMITED_PRODUCTS = [
    { id: '15438704836681', containerId: 'product-component-1765817264835' },     // Lolo Art Whiskey
    { id: '15438704869449', containerId: 'product-component-1765817296980' },     // Lolo Art Brandy
    { id: '15438704902217', containerId: 'product-component-1765817333679' },     // Lolo Art Gin
    { id: '15438705000521', containerId: 'product-component-1765817374753' },     // Chocolate Liquor
    { id: '15438705033289', containerId: 'product-component-1765817403183' }      // Coffee Liquor
];

const BASIC_PRODUCTS = [
    { id: '15438704836681', containerId: 'product-component-basic-whiskey'},              // Lolo Art Whiskey
    { id: '15438704312393', containerId: 'product-component-basic-malibugold-dry-red'},   // Malibugold Medium Dry
    { id: '15438704279625', containerId: 'product-component-basic-malibugold-sweet-red'}, // Malibugold Sweet
    { id: '15438704345161', containerId: 'product-component-basic-bignay-pitaya'},        // Bignay Pitaya
    { id: '15438704377929', containerId: 'product-component-basic-calamansi'},           // Calamansi
    { id: '15438704410697', containerId: 'product-component-basic-mango'}                // Mango  
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

// Pairing Page Buy Buttons (Basic Layout)
const BASIC_STYLES = {
    product: {
        styles: {
            product: {
                'max-width': '100%',
                'margin': '0',
                'padding': '0'
            },
            button: {
                'font-family': 'Open Sans, sans-serif',
                'background-color': '#ad343e',
                ':hover': {
                    'background-color': '#9c2f38'
                },
                'border-radius': '25px'
            }
        },
        buttonDestination: 'cart',
        contents: {
            img: false,
            title: false,
            price: false,
            options: false
        },
        text: {
            button: 'Add to cart'
        },
        googleFonts: ['Open Sans']
    },
    cart: SHOP_STYLES.cart,   // reuse cart styles safely
    toggle: SHOP_STYLES.toggle
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
    const isShopPage = document.getElementById('product-component-1765816272421') !== null;
    const isLimitedPage = document.getElementById('product-component-1765817264835') !== null;
    const isBasicPage = document.getElementById('product-component-basic-whiskey') !== null;

    if (isShopPage) {
        initializeShopifyProducts(SHOP_PRODUCTS, SHOP_STYLES);
    } else if (isLimitedPage) {
        initializeShopifyProducts(LIMITED_PRODUCTS, LIMITED_STYLES);
    } else if (isBasicPage) {
    initializeShopifyProducts(BASIC_PRODUCTS, BASIC_STYLES);
}
});
