var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = require("react-dom/server"), import_react = require("@remix-run/react"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node2 = require("@remix-run/node"), import_react4 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-L3VAPHKD.css";

// app/session.server.ts
var import_node = require("@remix-run/node"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/utils.ts
var import_react2 = require("react"), import_react3 = require("@remix-run/react"), import_supabase_js = require("@supabase/supabase-js"), import_tiny_invariant = __toESM(require("tiny-invariant")), supabaseUrl = process.env.SUPABASE_URL, supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
(0, import_tiny_invariant.default)(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
(0, import_tiny_invariant.default)(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);
var supabase = (0, import_supabase_js.createClient)(supabaseUrl, supabaseAnonKey);
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}

// app/models/user.server.ts
async function createUser(email, password) {
  let { user } = await supabase.auth.signUp({
    email,
    password
  });
  return await getProfileByEmail(user == null ? void 0 : user.email);
}
async function getProfileById(id) {
  let { data, error } = await supabase.from("profiles").select("email, id").eq("id", id).single();
  if (error)
    return null;
  if (data)
    return { id: data.id, email: data.email };
}
async function getProfileByEmail(email) {
  let { data, error } = await supabase.from("profiles").select("email, id").eq("email", email).single();
  if (error)
    return null;
  if (data)
    return data;
}
async function verifyLogin(email, password) {
  let { user, error } = await supabase.auth.signIn({
    email,
    password
  });
  return error ? void 0 : await getProfileByEmail(user == null ? void 0 : user.email);
}

// app/session.server.ts
(0, import_tiny_invariant2.default)(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set in your environment variables."
);
var sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getProfileById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/root.tsx
var import_flowbite_react = require("flowbite-react");

// app/flowbite-theme.ts
var flowbiteTheme = {
  badge: {
    root: {
      color: {
        primary: "bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 group-hover:bg-primary-200 dark:group-hover:bg-primary-300"
      },
      size: {
        xl: "px-3 py-2 text-base rounded-md"
      }
    },
    icon: {
      off: "rounded-full px-2 py-1"
    }
  },
  button: {
    color: {
      primary: "text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    },
    outline: {
      on: "transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit"
    },
    size: {
      md: "text-sm px-3 py-2"
    }
  },
  dropdown: {
    floating: {
      base: "z-10 w-fit rounded-xl divide-y divide-gray-100 shadow",
      content: "rounded-xl text-sm text-gray-700 dark:text-gray-200",
      target: "w-fit dark:text-white"
    },
    content: ""
  },
  modal: {
    content: {
      inner: "relative rounded-lg bg-white shadow dark:bg-gray-800"
    },
    header: {
      base: "flex items-start justify-between rounded-t px-5 pt-5"
    }
  },
  navbar: {
    root: {
      base: "fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    }
  },
  sidebar: {
    root: {
      base: "flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 h-full duration-75 border-r border-gray-200 lg:flex transition-width dark:border-gray-700"
    }
  },
  textarea: {
    base: "block w-full text-sm p-4 rounded-lg border disabled:cursor-not-allowed disabled:opacity-50"
  },
  toggleSwitch: {
    toggle: {
      checked: {
        off: "!border-gray-200 !bg-gray-200 dark:!border-gray-600 dark:!bg-gray-700"
      }
    }
  }
  // table: {
  //   head: {
  //     base: "!text-red-500"
  //   }
  // }
}, flowbite_theme_default = flowbiteTheme;

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), meta = () => [{ title: "THAMC" }], links = () => [{ rel: "stylesheet", href: tailwind_default }];
async function loader({ request }) {
  return (0, import_node2.json)({
    user: await getUser(request)
  });
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_flowbite_react.Flowbite, { theme: { theme: flowbite_theme_default }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 44,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/routes/contracts.tsx
var contracts_exports = {};
__export(contracts_exports, {
  default: () => CustomerPage
});

// app/layouts/MainLayout/index.tsx
var import_flowbite_react5 = require("flowbite-react");

// app/layouts/Navbar/index.tsx
var import_flowbite_react3 = require("flowbite-react");

// app/components/Search/index.tsx
var import_flowbite_react2 = require("flowbite-react"), import_hi = require("react-icons/hi"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), Search = ({ defaultValue, className }) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("form", { className, children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_flowbite_react2.Label, { htmlFor: "search", className: "sr-only", children: "Search" }, void 0, !1, {
    fileName: "app/components/Search/index.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
    import_flowbite_react2.TextInput,
    {
      icon: import_hi.HiSearch,
      id: "search",
      name: "search",
      placeholder: "Search",
      defaultValue,
      size: 32,
      type: "search"
    },
    void 0,
    !1,
    {
      fileName: "app/components/Search/index.tsx",
      lineNumber: 16,
      columnNumber: 7
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/Search/index.tsx",
  lineNumber: 12,
  columnNumber: 5
}, this), Search_default = Search;

// app/layouts/Navbar/index.tsx
var import_hi2 = require("react-icons/hi");

// app/context/SidebarContext.tsx
var import_react5 = require("react");

// app/helpers/is-browser.ts
function isBrowser() {
  return typeof window < "u";
}
var is_browser_default = isBrowser;

// app/helpers/is-small-screen.ts
function isSmallScreen() {
  return is_browser_default() && window.innerWidth < 768;
}
var is_small_screen_default = isSmallScreen;

// app/context/SidebarContext.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), SidebarContext = (0, import_react5.createContext)(void 0);
function SidebarProvider({ children }) {
  let location = is_browser_default() ? window.location.pathname : "/", [isOpen, setOpen] = (0, import_react5.useState)(
    is_browser_default() ? window.localStorage.getItem("isSidebarOpen") === "true" : !1
  );
  return (0, import_react5.useEffect)(() => {
    window.localStorage.setItem("isSidebarOpen", isOpen.toString());
  }, [isOpen]), (0, import_react5.useEffect)(() => {
    is_small_screen_default() && setOpen(!1);
  }, [location]), (0, import_react5.useEffect)(() => {
    function handleMobileTapInsideMain(event) {
      let main = document.querySelector("main"), isClickInsideMain = main == null ? void 0 : main.contains(event.target);
      is_small_screen_default() && isClickInsideMain && setOpen(!1);
    }
    return document.addEventListener("mousedown", handleMobileTapInsideMain), () => {
      document.removeEventListener("mousedown", handleMobileTapInsideMain);
    };
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    SidebarContext.Provider,
    {
      value: {
        isOpenOnSmallScreens: isOpen,
        isPageWithSidebar: !0,
        setOpenOnSmallScreens: setOpen
      },
      children
    },
    void 0,
    !1,
    {
      fileName: "app/context/SidebarContext.tsx",
      lineNumber: 56,
      columnNumber: 5
    },
    this
  );
}
function useSidebarContext() {
  let context = (0, import_react5.useContext)(SidebarContext);
  if (typeof context > "u")
    throw new Error(
      "useSidebarContext should be used within the SidebarContext provider!"
    );
  return context;
}

// app/images/thamc.png
var thamc_default = "/build/_assets/thamc-4VRUOGC5.png";

// app/layouts/Navbar/index.tsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), { Brand } = import_flowbite_react3.Navbar, NavbarLayout = () => {
  let { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } = useSidebarContext();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.Navbar, { fluid: !0, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full p-3 lg:px-5 lg:pl-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center", children: [
      isPageWithSidebar && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "button",
        {
          onClick: () => setOpenOnSmallScreens(!isOpenOnSmallScreens),
          className: "mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "Toggle sidebar" }, void 0, !1, {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 41,
              columnNumber: 17
            }, this),
            isOpenOnSmallScreens && is_small_screen_default() ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiX, { className: "h-6 w-6" }, void 0, !1, {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 43,
              columnNumber: 19
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiMenuAlt1, { className: "h-6 w-6" }, void 0, !1, {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 45,
              columnNumber: 19
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 37,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Brand, { href: "/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("img", { alt: "", src: thamc_default, className: "h-10 sm:h-14" }, void 0, !1, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 50,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 49,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Search_default, { className: "ml-14 hidden md:block" }, void 0, !1, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 52,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 35,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center lg:gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          "button",
          {
            onClick: () => setOpenOnSmallScreens(!isOpenOnSmallScreens),
            className: "cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "Search" }, void 0, !1, {
                fileName: "app/layouts/Navbar/index.tsx",
                lineNumber: 60,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiSearch, { className: "h-6 w-6" }, void 0, !1, {
                fileName: "app/layouts/Navbar/index.tsx",
                lineNumber: 61,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/layouts/Navbar/index.tsx",
            lineNumber: 56,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(NotificationBellDropdown, {}, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 63,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(AppDrawerDropdown, {}, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 64,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.DarkThemeToggle, {}, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 65,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 55,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "hidden lg:block", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(UserDropdown, {}, void 0, !1, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 68,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 67,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 54,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/layouts/Navbar/index.tsx",
    lineNumber: 34,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/layouts/Navbar/index.tsx",
    lineNumber: 33,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/layouts/Navbar/index.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}, NotificationBellDropdown = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    import_flowbite_react3.Dropdown,
    {
      arrowIcon: !1,
      inline: !0,
      label: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "Notifications" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiBell, { className: "text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 85,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "max-w-[24rem]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "block rounded-t-xl bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400", children: "Notifications" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 90,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "flex border-y px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "shrink-0", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                    "img",
                    {
                      alt: "",
                      src: "https://gravatar.com/avatar/b24d0432806655e70958a0759cd5f261?s=400&d=robohash&r=xg",
                      className: "h-11 w-11 rounded-full"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 99,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "bg-primary-700 absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(NewMessageIcon, {}, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 105,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 104,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 98,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full pl-3", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400", children: [
                    "New message from\xA0",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-semibold text-gray-900 dark:text-white", children: "Bonnie Green" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 111,
                      columnNumber: 17
                    }, this),
                    `: "Hey, what's up? All set for the presentation?"`
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 109,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-primary-700 dark:text-primary-400 text-xs font-medium", children: "a few moments ago" }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 116,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 108,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 94,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "shrink-0", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                    "img",
                    {
                      alt: "",
                      src: "https://gravatar.com/avatar/b24d0432806655e70958a0759cd5f261?s=400&d=robohash&r=x",
                      className: "h-11 w-11 rounded-full"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 126,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gray-900 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(NewFollowIcon, {}, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 132,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 131,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 125,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full pl-3", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-semibold text-gray-900 dark:text-white", children: "Jese Leos" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 137,
                      columnNumber: 17
                    }, this),
                    "\xA0and\xA0",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-medium text-gray-900 dark:text-white", children: "5 others" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 141,
                      columnNumber: 17
                    }, this),
                    "\xA0started following you."
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 136,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-primary-700 dark:text-primary-400 text-xs font-medium", children: "10 minutes ago" }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 146,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 135,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 121,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "shrink-0", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                    "img",
                    {
                      alt: "",
                      src: "https://gravatar.com/avatar/b24d0432806655e70958a0759cd5f261?s=400&d=robohash&r=x",
                      className: "h-11 w-11 rounded-full"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 156,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-600 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(NewLoveIcon, {}, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 162,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 161,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 155,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full pl-3", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-semibold text-gray-900 dark:text-white", children: "Joseph Mcfall" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 167,
                      columnNumber: 17
                    }, this),
                    "\xA0and\xA0",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-medium text-gray-900 dark:text-white", children: "141 others" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 171,
                      columnNumber: 17
                    }, this),
                    "\xA0love your story. See it and view more stories."
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 166,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-primary-700 dark:text-primary-400 text-xs font-medium", children: "44 minutes ago" }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 176,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 165,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 151,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "shrink-0", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                    "img",
                    {
                      alt: "",
                      src: "https://gravatar.com/avatar/b24d0432806655e70958a0759cd5f261?s=400&d=robohash&r=x",
                      className: "h-11 w-11 rounded-full"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 186,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-green-400 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(NewMentionIcon, {}, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 192,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 191,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 185,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full pl-3", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-semibold text-gray-900 dark:text-white", children: "Leslie Livingston" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 197,
                      columnNumber: 17
                    }, this),
                    "\xA0mentioned you in a comment:\xA0",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-primary-700 dark:text-primary-500 font-medium", children: "@bonnie.green" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 201,
                      columnNumber: 17
                    }, this),
                    "\xA0what do you say?"
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 196,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-primary-700 dark:text-primary-400 text-xs font-medium", children: "1 hour ago" }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 206,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 195,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 181,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "shrink-0", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                    "img",
                    {
                      alt: "",
                      src: "https://gravatar.com/avatar/b24d0432806655e70958a0759cd5f261?s=400&d=robohash&r=x",
                      className: "h-11 w-11 rounded-full"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 216,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(NewVideoIcon, {}, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 222,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 221,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 215,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full pl-3", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-semibold text-gray-900 dark:text-white", children: "Robert Brown" }, void 0, !1, {
                      fileName: "app/layouts/Navbar/index.tsx",
                      lineNumber: 227,
                      columnNumber: 17
                    }, this),
                    "\xA0posted a new video: Glassmorphism - learn how to implement the new design trend."
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 226,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-primary-700 dark:text-primary-400 text-xs font-medium", children: "3 hours ago" }, void 0, !1, {
                    fileName: "app/layouts/Navbar/index.tsx",
                    lineNumber: 233,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 225,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 211,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 93,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          "a",
          {
            href: "#",
            className: "block rounded-b-xl bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "inline-flex items-center gap-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiEye, { className: "h-6 w-6" }, void 0, !1, {
                fileName: "app/layouts/Navbar/index.tsx",
                lineNumber: 244,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "View all" }, void 0, !1, {
                fileName: "app/layouts/Navbar/index.tsx",
                lineNumber: 245,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 243,
              columnNumber: 11
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/layouts/Navbar/index.tsx",
            lineNumber: 239,
            columnNumber: 9
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 89,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 79,
      columnNumber: 5
    },
    this
  );
}, NewMessageIcon = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    "svg",
    {
      className: "h-3 w-3 text-white",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 261,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 262,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 255,
      columnNumber: 5
    },
    this
  );
}, NewFollowIcon = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    "svg",
    {
      className: "h-3 w-3 text-white",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" }, void 0, !1, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 275,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 269,
      columnNumber: 5
    },
    this
  );
}, NewLoveIcon = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    "svg",
    {
      className: "h-3 w-3 text-white",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "path",
        {
          fillRule: "evenodd",
          d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",
          clipRule: "evenodd"
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 288,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 282,
      columnNumber: 5
    },
    this
  );
}, NewMentionIcon = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    "svg",
    {
      className: "h-3 w-3 text-white",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "path",
        {
          fillRule: "evenodd",
          d: "M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z",
          clipRule: "evenodd"
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 305,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 299,
      columnNumber: 5
    },
    this
  );
}, NewVideoIcon = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    "svg",
    {
      className: "h-3 w-3 text-white",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" }, void 0, !1, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 322,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 316,
      columnNumber: 5
    },
    this
  );
}, AppDrawerDropdown = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    import_flowbite_react3.Dropdown,
    {
      arrowIcon: !1,
      inline: !0,
      label: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "Apps" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 334,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiViewGrid, { className: "text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 335,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 333,
        columnNumber: 9
      }, this),
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "block rounded-t-lg border-b bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:border-b-gray-600 dark:bg-gray-700 dark:text-white", children: "Apps" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 339,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "grid grid-cols-3 gap-4 p-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiShoppingBag, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 347,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Sales" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 348,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 343,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiUsers, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 356,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Users" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 357,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 352,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiInbox, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 365,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Inbox" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 366,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 361,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiUserCircle, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 374,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Profile" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 375,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 370,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiCog, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 383,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Settings" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 384,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 379,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiArchive, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 392,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Products" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 393,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 388,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiCurrencyDollar, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 401,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Pricing" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 402,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 397,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiOutlineTicket, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 410,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Billing" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 411,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 406,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "a",
            {
              href: "#",
              className: "block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_hi2.HiLogout, { className: "mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 419,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Logout" }, void 0, !1, {
                  fileName: "app/layouts/Navbar/index.tsx",
                  lineNumber: 420,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/layouts/Navbar/index.tsx",
              lineNumber: 415,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 342,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 329,
      columnNumber: 5
    },
    this
  );
}, UserDropdown = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    import_flowbite_react3.Dropdown,
    {
      arrowIcon: !1,
      inline: !0,
      label: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "User menu" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 436,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          import_flowbite_react3.Avatar,
          {
            alt: "",
            img: "https://gravatar.com/avatar/b24d0432806655e70958a0759cd5f261?s=400&d=robohash&r=x",
            rounded: !0,
            size: "sm"
          },
          void 0,
          !1,
          {
            fileName: "app/layouts/Navbar/index.tsx",
            lineNumber: 437,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/layouts/Navbar/index.tsx",
        lineNumber: 435,
        columnNumber: 9
      }, this),
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.Dropdown.Header, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "block text-sm", children: "Neil Sims" }, void 0, !1, {
            fileName: "app/layouts/Navbar/index.tsx",
            lineNumber: 447,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "block truncate text-sm font-medium", children: "neil.sims@flowbite.com" }, void 0, !1, {
            fileName: "app/layouts/Navbar/index.tsx",
            lineNumber: 448,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 446,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.Dropdown.Item, { children: "Dashboard" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 452,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.Dropdown.Item, { children: "Settings" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 453,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.Dropdown.Item, { children: "Earnings" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 454,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.Dropdown.Divider, {}, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 455,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_flowbite_react3.Dropdown.Item, { children: "Sign out" }, void 0, !1, {
          fileName: "app/layouts/Navbar/index.tsx",
          lineNumber: 456,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/layouts/Navbar/index.tsx",
      lineNumber: 431,
      columnNumber: 5
    },
    this
  );
}, Navbar_default = NavbarLayout;

// app/layouts/Sidebar/index.tsx
var import_classnames = __toESM(require("classnames")), import_flowbite_react4 = require("flowbite-react"), import_react6 = require("react"), import_hi3 = require("react-icons/hi");
var import_react7 = require("@remix-run/react"), import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), SidebarLayout = function() {
  let { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } = useSidebarContext(), [currentPage, setCurrentPage] = (0, import_react6.useState)("");
  (0, import_react6.useEffect)(() => {
    let newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);
  let activeStyle = "bg-gray-100 dark:bg-gray-700 rounded-lg";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
    "div",
    {
      className: (0, import_classnames.default)("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens
      }),
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        import_flowbite_react4.Sidebar,
        {
          "aria-label": "Sidebar with multi-level dropdown example",
          collapsed: isSidebarOpenOnSmallScreens && !is_small_screen_default(),
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex h-full flex-col justify-between py-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Search_default, { className: "pb-3 md:hidden" }, void 0, !1, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 43,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_flowbite_react4.Sidebar.Items, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_flowbite_react4.Sidebar.ItemGroup, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  import_react7.Link,
                  {
                    to: "/",
                    className: `block ${currentPage === "/" && activeStyle}`,
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_flowbite_react4.Sidebar.Item, { icon: import_hi3.HiChartPie, as: "div", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Dashboard" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 51,
                      columnNumber: 21
                    }, this) }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 50,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/layouts/Sidebar/index.tsx",
                    lineNumber: 46,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  import_react7.Link,
                  {
                    to: "/customers",
                    className: `block ${currentPage === "/customers" && activeStyle}`,
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_flowbite_react4.Sidebar.Item, { icon: import_hi3.HiUsers, as: "div", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Customers" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 61,
                      columnNumber: 21
                    }, this) }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 60,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/layouts/Sidebar/index.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  import_react7.Link,
                  {
                    to: "/contracts",
                    className: `block ${currentPage === "/contracts" && activeStyle}`,
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_flowbite_react4.Sidebar.Item, { icon: import_hi3.HiCollection, as: "div", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Contracts" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 71,
                      columnNumber: 21
                    }, this) }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 70,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/layouts/Sidebar/index.tsx",
                    lineNumber: 64,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 45,
                columnNumber: 15
              }, this) }, void 0, !1, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 44,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/layouts/Sidebar/index.tsx",
              lineNumber: 42,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(BottomMenu, {}, void 0, !1, {
              fileName: "app/layouts/Sidebar/index.tsx",
              lineNumber: 77,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 41,
            columnNumber: 9
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/Sidebar/index.tsx",
          lineNumber: 37,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/layouts/Sidebar/index.tsx",
      lineNumber: 32,
      columnNumber: 5
    },
    this
  );
}, BottomMenu = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center justify-center gap-x-5", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { className: "rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "sr-only", children: "Tweaks" }, void 0, !1, {
        fileName: "app/layouts/Sidebar/index.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_hi3.HiAdjustments, { className: "text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " }, void 0, !1, {
        fileName: "app/layouts/Sidebar/index.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/layouts/Sidebar/index.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_flowbite_react4.Tooltip, { content: "Settings page", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
      "a",
      {
        href: "/users/settings",
        className: "inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "sr-only", children: "Settings page" }, void 0, !1, {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 97,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_hi3.HiCog, { className: "text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" }, void 0, !1, {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 98,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/layouts/Sidebar/index.tsx",
        lineNumber: 93,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/layouts/Sidebar/index.tsx",
      lineNumber: 92,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/layouts/Sidebar/index.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(LanguageDropdown, {}, void 0, !1, {
      fileName: "app/layouts/Sidebar/index.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/layouts/Sidebar/index.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/layouts/Sidebar/index.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
}, LanguageDropdown = function() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
    import_flowbite_react4.Dropdown,
    {
      arrowIcon: !1,
      inline: !0,
      label: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "sr-only", children: "Current language" }, void 0, !1, {
          fileName: "app/layouts/Sidebar/index.tsx",
          lineNumber: 116,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink",
            viewBox: "0 0 3900 3900",
            className: "h-5 w-5 rounded-full",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#b22234", d: "M0 0h7410v3900H0z" }, void 0, !1, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 123,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                "path",
                {
                  d: "M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0",
                  stroke: "#fff",
                  strokeWidth: "300"
                },
                void 0,
                !1,
                {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 124,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#3c3b6e", d: "M0 0h2964v2100H0z" }, void 0, !1, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 129,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { fill: "#fff", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { id: "d", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { id: "c", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { id: "e", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { id: "b", children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                          "path",
                          {
                            id: "a",
                            d: "M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/layouts/Sidebar/index.tsx",
                            lineNumber: 135,
                            columnNumber: 23
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#a", y: "420" }, void 0, !1, {
                          fileName: "app/layouts/Sidebar/index.tsx",
                          lineNumber: 139,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#a", y: "840" }, void 0, !1, {
                          fileName: "app/layouts/Sidebar/index.tsx",
                          lineNumber: 140,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#a", y: "1260" }, void 0, !1, {
                          fileName: "app/layouts/Sidebar/index.tsx",
                          lineNumber: 141,
                          columnNumber: 23
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 134,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#a", y: "1680" }, void 0, !1, {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 143,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 133,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#b", x: "247", y: "210" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 145,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Sidebar/index.tsx",
                    lineNumber: 132,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#c", x: "494" }, void 0, !1, {
                    fileName: "app/layouts/Sidebar/index.tsx",
                    lineNumber: 147,
                    columnNumber: 17
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 131,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#d", x: "988" }, void 0, !1, {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 149,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#c", x: "1976" }, void 0, !1, {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 150,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("use", { xlinkHref: "#e", x: "2470" }, void 0, !1, {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 151,
                  columnNumber: 15
                }, this)
              ] }, void 0, !0, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 130,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 117,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/layouts/Sidebar/index.tsx",
        lineNumber: 115,
        columnNumber: 9
      }, this),
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("ul", { className: "py-1", role: "none", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "a",
          {
            href: "#",
            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "inline-flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                "svg",
                {
                  className: "mr-2 h-4 w-4 rounded-full",
                  xmlns: "http://www.w3.org/2000/svg",
                  id: "flag-icon-css-us",
                  viewBox: "0 0 512 512",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { fillRule: "evenodd", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { strokeWidth: "1pt", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                        "path",
                        {
                          fill: "#bd3d44",
                          d: "M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z",
                          transform: "scale(3.9385)"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/layouts/Sidebar/index.tsx",
                          lineNumber: 172,
                          columnNumber: 21
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                        "path",
                        {
                          fill: "#fff",
                          d: "M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z",
                          transform: "scale(3.9385)"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/layouts/Sidebar/index.tsx",
                          lineNumber: 177,
                          columnNumber: 21
                        },
                        this
                      )
                    ] }, void 0, !0, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 171,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "path",
                      {
                        fill: "#192f5d",
                        d: "M0 0h98.8v70H0z",
                        transform: "scale(3.9385)"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 183,
                        columnNumber: 19
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "path",
                      {
                        fill: "#fff",
                        d: "M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z",
                        transform: "scale(3.9385)"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 188,
                        columnNumber: 19
                      },
                      this
                    )
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Sidebar/index.tsx",
                    lineNumber: 170,
                    columnNumber: 17
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 164,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "whitespace-nowrap", children: "English (US)" }, void 0, !1, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 195,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/layouts/Sidebar/index.tsx",
              lineNumber: 163,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 159,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/layouts/Sidebar/index.tsx",
          lineNumber: 158,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "a",
          {
            href: "#",
            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "inline-flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                "svg",
                {
                  className: "mr-2 h-4 w-4 rounded-full",
                  xmlns: "http://www.w3.org/2000/svg",
                  id: "flag-icon-css-de",
                  viewBox: "0 0 512 512",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#ffce00", d: "M0 341.3h512V512H0z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 211,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { d: "M0 0h512v170.7H0z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 212,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#d00", d: "M0 170.7h512v170.6H0z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 213,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 205,
                  columnNumber: 15
                },
                this
              ),
              "Deutsch"
            ] }, void 0, !0, {
              fileName: "app/layouts/Sidebar/index.tsx",
              lineNumber: 204,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 200,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/layouts/Sidebar/index.tsx",
          lineNumber: 199,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "a",
          {
            href: "#",
            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "inline-flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                "svg",
                {
                  className: "mr-2 h-4 w-4 rounded-full",
                  xmlns: "http://www.w3.org/2000/svg",
                  id: "flag-icon-css-it",
                  viewBox: "0 0 512 512",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("g", { fillRule: "evenodd", strokeWidth: "1pt", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#fff", d: "M0 0h512v512H0z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 232,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#009246", d: "M0 0h170.7v512H0z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 233,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#ce2b37", d: "M341.3 0H512v512H341.3z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 234,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/layouts/Sidebar/index.tsx",
                    lineNumber: 231,
                    columnNumber: 17
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 225,
                  columnNumber: 15
                },
                this
              ),
              "Italiano"
            ] }, void 0, !0, {
              fileName: "app/layouts/Sidebar/index.tsx",
              lineNumber: 224,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 220,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/layouts/Sidebar/index.tsx",
          lineNumber: 219,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "a",
          {
            href: "#",
            className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "inline-flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                "svg",
                {
                  className: "mr-2 h-4 w-4 rounded-full",
                  xmlns: "http://www.w3.org/2000/svg",
                  xmlnsXlink: "http://www.w3.org/1999/xlink",
                  id: "flag-icon-css-cn",
                  viewBox: "0 0 512 512",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { id: "a", fill: "#ffde00", d: "M1-.3L-.7.8 0-1 .6.8-1-.3z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 255,
                      columnNumber: 19
                    }, this) }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 254,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("path", { fill: "#de2910", d: "M0 0h512v512H0z" }, void 0, !1, {
                      fileName: "app/layouts/Sidebar/index.tsx",
                      lineNumber: 257,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "use",
                      {
                        width: "30",
                        height: "20",
                        transform: "matrix(76.8 0 0 76.8 128 128)",
                        xlinkHref: "#a"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 258,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "use",
                      {
                        width: "30",
                        height: "20",
                        transform: "rotate(-121 142.6 -47) scale(25.5827)",
                        xlinkHref: "#a"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 264,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "use",
                      {
                        width: "30",
                        height: "20",
                        transform: "rotate(-98.1 198 -82) scale(25.6)",
                        xlinkHref: "#a"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 270,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "use",
                      {
                        width: "30",
                        height: "20",
                        transform: "rotate(-74 272.4 -114) scale(25.6137)",
                        xlinkHref: "#a"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 276,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                      "use",
                      {
                        width: "30",
                        height: "20",
                        transform: "matrix(16 -19.968 19.968 16 256 230.4)",
                        xlinkHref: "#a"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/layouts/Sidebar/index.tsx",
                        lineNumber: 282,
                        columnNumber: 17
                      },
                      this
                    )
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/layouts/Sidebar/index.tsx",
                  lineNumber: 247,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "whitespace-nowrap", children: "\u4E2D\u6587 (\u7E41\u9AD4)" }, void 0, !1, {
                fileName: "app/layouts/Sidebar/index.tsx",
                lineNumber: 289,
                columnNumber: 15
              }, this)
            ] }, void 0, !0, {
              fileName: "app/layouts/Sidebar/index.tsx",
              lineNumber: 246,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/layouts/Sidebar/index.tsx",
            lineNumber: 242,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/layouts/Sidebar/index.tsx",
          lineNumber: 241,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/layouts/Sidebar/index.tsx",
        lineNumber: 157,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/layouts/Sidebar/index.tsx",
      lineNumber: 111,
      columnNumber: 5
    },
    this
  );
}, Sidebar_default = SidebarLayout;

// app/layouts/MainLayout/index.tsx
var import_md = require("react-icons/md"), import_fa = require("react-icons/fa");
var import_classnames2 = __toESM(require("classnames")), import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), MainLayout = ({
  children,
  isFooter = !0
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(SidebarProvider, { children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Navbar_default, {}, void 0, !1, {
    fileName: "app/layouts/MainLayout/index.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex items-start pt-20", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Sidebar_default, {}, void 0, !1, {
      fileName: "app/layouts/MainLayout/index.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(MainContent, { isFooter, children }, void 0, !1, {
      fileName: "app/layouts/MainLayout/index.tsx",
      lineNumber: 23,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/layouts/MainLayout/index.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/layouts/MainLayout/index.tsx",
  lineNumber: 19,
  columnNumber: 5
}, this), MainContent = ({
  children,
  isFooter
}) => {
  let { isOpenOnSmallScreens: isSidebarOpen } = useSidebarContext();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    "main",
    {
      className: (0, import_classnames2.default)(
        "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
        isSidebarOpen ? "lg:ml-16" : "lg:ml-64"
      ),
      children: [
        children,
        isFooter && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "mx-4 mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(MainContentFooter, {}, void 0, !1, {
          fileName: "app/layouts/MainLayout/index.tsx",
          lineNumber: 45,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/layouts/MainLayout/index.tsx",
          lineNumber: 44,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/layouts/MainLayout/index.tsx",
      lineNumber: 36,
      columnNumber: 5
    },
    this
  );
}, MainContentFooter = () => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_jsx_dev_runtime7.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer, { container: !0, children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer.LinkGroup, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer.Link, { href: "#", className: "mb-3 mr-3 lg:mb-0", children: "Terms and conditions" }, void 0, !1, {
        fileName: "app/layouts/MainLayout/index.tsx",
        lineNumber: 58,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer.Link, { href: "#", className: "mb-3 mr-3 lg:mb-0", children: "Privacy Policy" }, void 0, !1, {
        fileName: "app/layouts/MainLayout/index.tsx",
        lineNumber: 61,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer.Link, { href: "#", className: "mr-3", children: "Licensing" }, void 0, !1, {
        fileName: "app/layouts/MainLayout/index.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer.Link, { href: "#", className: "mr-3", children: "Cookie Policy" }, void 0, !1, {
        fileName: "app/layouts/MainLayout/index.tsx",
        lineNumber: 67,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer.Link, { href: "#", children: "Contact" }, void 0, !1, {
        fileName: "app/layouts/MainLayout/index.tsx",
        lineNumber: 70,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/layouts/MainLayout/index.tsx",
      lineNumber: 57,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_flowbite_react5.Footer.LinkGroup, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex gap-x-1", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_flowbite_react5.Footer.Link,
        {
          href: "#",
          className: "hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_md.MdFacebook, { className: "text-lg" }, void 0, !1, {
            fileName: "app/layouts/MainLayout/index.tsx",
            lineNumber: 78,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/MainLayout/index.tsx",
          lineNumber: 74,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_flowbite_react5.Footer.Link,
        {
          href: "#",
          className: "hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_fa.FaInstagram, { className: "text-lg" }, void 0, !1, {
            fileName: "app/layouts/MainLayout/index.tsx",
            lineNumber: 84,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/MainLayout/index.tsx",
          lineNumber: 80,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_flowbite_react5.Footer.Link,
        {
          href: "#",
          className: "hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_fa.FaTwitter, { className: "text-lg" }, void 0, !1, {
            fileName: "app/layouts/MainLayout/index.tsx",
            lineNumber: 90,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/MainLayout/index.tsx",
          lineNumber: 86,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_flowbite_react5.Footer.Link,
        {
          href: "#",
          className: "hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_fa.FaGithub, { className: "text-lg" }, void 0, !1, {
            fileName: "app/layouts/MainLayout/index.tsx",
            lineNumber: 96,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/MainLayout/index.tsx",
          lineNumber: 92,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_flowbite_react5.Footer.Link,
        {
          href: "#",
          className: "hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_fa.FaDribbble, { className: "text-lg" }, void 0, !1, {
            fileName: "app/layouts/MainLayout/index.tsx",
            lineNumber: 102,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/layouts/MainLayout/index.tsx",
          lineNumber: 98,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/layouts/MainLayout/index.tsx",
      lineNumber: 73,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/layouts/MainLayout/index.tsx",
      lineNumber: 72,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/layouts/MainLayout/index.tsx",
    lineNumber: 56,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/layouts/MainLayout/index.tsx",
    lineNumber: 55,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "my-8 text-center text-sm text-gray-500 dark:text-gray-300", children: "\xA9 2019-2022 Flowbite.com. All rights reserved." }, void 0, !1, {
    fileName: "app/layouts/MainLayout/index.tsx",
    lineNumber: 108,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/layouts/MainLayout/index.tsx",
  lineNumber: 54,
  columnNumber: 5
}, this), MainLayout_default = MainLayout;

// app/routes/contracts.tsx
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function CustomerPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(MainLayout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "px-4 pt-6", children: "Contracts" }, void 0, !1, {
    fileName: "app/routes/contracts.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/contracts.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/customers.tsx
var customers_exports = {};
__export(customers_exports, {
  action: () => action,
  default: () => CustomerPage2,
  loader: () => loader2
});
var import_node3 = require("@remix-run/node"), import_react13 = require("@remix-run/react");

// app/components/Pagination/index.tsx
var import_react8 = require("@remix-run/react"), import_solid = require("@heroicons/react/24/solid"), import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), Pagination = ({
  currentPage,
  totalPage,
  prevPage,
  nextPage
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center justify-end bg-white p-4 dark:border-gray-700 dark:bg-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
    import_react8.Link,
    {
      to: prevPage || "/",
      className: `${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"} inline-flex justify-center rounded p-1 text-gray-500 dark:text-gray-400`,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "sr-only", children: "Previous page" }, void 0, !1, {
          fileName: "app/components/Pagination/index.tsx",
          lineNumber: 28,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid.ChevronLeftIcon, { className: "h-6 w-6" }, void 0, !1, {
          fileName: "app/components/Pagination/index.tsx",
          lineNumber: 29,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/Pagination/index.tsx",
      lineNumber: 20,
      columnNumber: 7
    },
    this
  ),
  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
    import_react8.Link,
    {
      to: nextPage || "/",
      className: `${currentPage === totalPage ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"} mr-2 inline-flex justify-center rounded p-1 text-gray-500 dark:text-gray-400`,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "sr-only", children: "Next page" }, void 0, !1, {
          fileName: "app/components/Pagination/index.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid.ChevronRightIcon, { className: "h-6 w-6" }, void 0, !1, {
          fileName: "app/components/Pagination/index.tsx",
          lineNumber: 40,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/Pagination/index.tsx",
      lineNumber: 31,
      columnNumber: 7
    },
    this
  ),
  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "text-sm font-normal text-gray-500 dark:text-gray-400", children: [
    "Page\xA0",
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "font-semibold text-gray-900 dark:text-white", children: currentPage }, void 0, !1, {
      fileName: "app/components/Pagination/index.tsx",
      lineNumber: 44,
      columnNumber: 9
    }, this),
    "\xA0of\xA0",
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "font-semibold text-gray-900 dark:text-white", children: totalPage }, void 0, !1, {
      fileName: "app/components/Pagination/index.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Pagination/index.tsx",
    lineNumber: 42,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/Pagination/index.tsx",
  lineNumber: 19,
  columnNumber: 5
}, this), Pagination_default = Pagination;

// app/components/tables/CustomersTable/index.tsx
var import_flowbite_react6 = require("flowbite-react"), import_hi4 = require("react-icons/hi"), import_react9 = require("@remix-run/react"), import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), CustomersTable = ({
  currentPage,
  customers
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table, { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-600", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Head, { className: "bg-gray-100 dark:bg-gray-700", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.HeadCell, { children: "#" }, void 0, !1, {
      fileName: "app/components/tables/CustomersTable/index.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.HeadCell, { children: "Name" }, void 0, !1, {
      fileName: "app/components/tables/CustomersTable/index.tsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.HeadCell, { children: "Position" }, void 0, !1, {
      fileName: "app/components/tables/CustomersTable/index.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.HeadCell, { children: "Salary" }, void 0, !1, {
      fileName: "app/components/tables/CustomersTable/index.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.HeadCell, { children: "Address" }, void 0, !1, {
      fileName: "app/components/tables/CustomersTable/index.tsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.HeadCell, { children: "Tel" }, void 0, !1, {
      fileName: "app/components/tables/CustomersTable/index.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.HeadCell, { children: "Action" }, void 0, !1, {
      fileName: "app/components/tables/CustomersTable/index.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/tables/CustomersTable/index.tsx",
    lineNumber: 18,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Body, { className: "divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800", children: customers == null ? void 0 : customers.map((customer) => {
    let {
      id,
      first_name,
      last_name,
      national_id,
      occupation_types,
      salary,
      address_details,
      tel_no
    } = customer;
    return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
      import_flowbite_react6.Table.Row,
      {
        className: "hover:bg-gray-100 dark:hover:bg-gray-700",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Cell, { className: "text-base font-semibold text-gray-900 dark:text-white", children: id }, void 0, !1, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 44,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Cell, { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-base font-semibold text-gray-900 dark:text-white", children: [
              first_name,
              " ",
              last_name
            ] }, void 0, !0, {
              fileName: "app/components/tables/CustomersTable/index.tsx",
              lineNumber: 48,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-sm font-normal text-gray-500 dark:text-gray-400", children: national_id }, void 0, !1, {
              fileName: "app/components/tables/CustomersTable/index.tsx",
              lineNumber: 51,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 47,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Cell, { className: "text-base text-gray-900 dark:text-white", children: occupation_types == null ? void 0 : occupation_types.name }, void 0, !1, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 55,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Cell, { className: "text-base text-gray-900 dark:text-white", children: salary }, void 0, !1, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 58,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Cell, { className: "text-base text-gray-900 dark:text-white", children: address_details }, void 0, !1, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 61,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Cell, { className: "text-base text-gray-900 dark:text-white", children: tel_no }, void 0, !1, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 64,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Table.Cell, { className: "text-base text-gray-900 dark:text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
              import_react9.Link,
              {
                to: `?page=${currentPage}&customerId=${id}&modal-type=edit`,
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Button, { color: "info", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center gap-x-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_hi4.HiOutlinePencilAlt, { className: "text-lg" }, void 0, !1, {
                    fileName: "app/components/tables/CustomersTable/index.tsx",
                    lineNumber: 74,
                    columnNumber: 25
                  }, this),
                  "Edit"
                ] }, void 0, !0, {
                  fileName: "app/components/tables/CustomersTable/index.tsx",
                  lineNumber: 73,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/components/tables/CustomersTable/index.tsx",
                  lineNumber: 72,
                  columnNumber: 21
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/tables/CustomersTable/index.tsx",
                lineNumber: 69,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
              import_react9.Link,
              {
                to: `?page=${currentPage}&customerId=${id}&modal-type=delete`,
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_flowbite_react6.Button, { color: "failure", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center gap-x-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_hi4.HiTrash, { className: "text-lg" }, void 0, !1, {
                    fileName: "app/components/tables/CustomersTable/index.tsx",
                    lineNumber: 84,
                    columnNumber: 25
                  }, this),
                  "Delete"
                ] }, void 0, !0, {
                  fileName: "app/components/tables/CustomersTable/index.tsx",
                  lineNumber: 83,
                  columnNumber: 23
                }, this) }, void 0, !1, {
                  fileName: "app/components/tables/CustomersTable/index.tsx",
                  lineNumber: 82,
                  columnNumber: 21
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/tables/CustomersTable/index.tsx",
                lineNumber: 79,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 68,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/tables/CustomersTable/index.tsx",
            lineNumber: 67,
            columnNumber: 15
          }, this)
        ]
      },
      id,
      !0,
      {
        fileName: "app/components/tables/CustomersTable/index.tsx",
        lineNumber: 40,
        columnNumber: 13
      },
      this
    );
  }) }, void 0, !1, {
    fileName: "app/components/tables/CustomersTable/index.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/tables/CustomersTable/index.tsx",
  lineNumber: 17,
  columnNumber: 5
}, this), CustomersTable_default = CustomersTable;

// app/models/customers.sever.ts
var query = `*, business_types(name), gender(name), 
  home_types(name), marital_status(name), occupation_types(name)`;
async function getCustomerListItems(params) {
  let { from, to } = params || {}, { data, count, error } = await supabase.from("customers").select(query, { count: "exact" }).order("id", { ascending: !0 }).range(from || 0, to || 999999999);
  return { data, count: count || 0, error };
}
async function getCustomerById(customerId) {
  let { data, error } = await supabase.from("customers").select(query).eq("id", customerId).single();
  return { data, error };
}
async function searchCustomer(params) {
  let { search, to, from } = params || {}, { data, count, error } = await supabase.from("customers").select(query, { count: "exact" }).order("id", { ascending: !0 }).like("search_customers", `%${search}%`).range(from || 0, to || 999999999);
  return { data, count: count || 0, error };
}
async function deleteCustomer(customerId) {
  let { error } = await supabase.from("customers").delete({ returning: "minimal" }).eq("id", customerId);
  return error ? null : {};
}
async function createCustomer({ first_name, last_name, national_id, salary, tel_no, address_details, position }) {
  let { data, error } = await supabase.from("customers").insert([{ first_name, last_name, national_id, salary, tel_no, address_details, occupation_types_id: position }]).single();
  return error ? null : data;
}
async function updateCustomer({ customerId, first_name, last_name, national_id, salary, tel_no, address_details, position }) {
  let { data, error } = await supabase.from("customers").update({ first_name, last_name, national_id, salary, tel_no, address_details, occupation_types_id: position }).eq("id", customerId).single();
  return error ? null : data;
}
async function getPositionListItems() {
  let { data, error } = await supabase.from("occupation_types").select("*").order("id", { ascending: !0 });
  return { data, error };
}

// app/routes/customers.tsx
var import_hi8 = require("react-icons/hi");

// app/components/modals/DeleteModal/index.tsx
var import_flowbite_react7 = require("flowbite-react"), import_hi5 = require("react-icons/hi"), import_react10 = require("@remix-run/react"), import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), DeleteModal = ({ visible }) => {
  let navigate = (0, import_react10.useNavigate)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_flowbite_react7.Modal, { show: visible, size: "md", onClose: () => navigate("#"), children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_flowbite_react7.Modal.Header, { className: "px-6 pb-0 pt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "sr-only", children: "Delete" }, void 0, !1, {
      fileName: "app/components/modals/DeleteModal/index.tsx",
      lineNumber: 15,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/modals/DeleteModal/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_flowbite_react7.Modal.Body, { className: "px-6 pb-6 pt-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-col items-center gap-y-6 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_hi5.HiOutlineExclamationCircle, { className: "text-7xl text-red-500" }, void 0, !1, {
        fileName: "app/components/modals/DeleteModal/index.tsx",
        lineNumber: 19,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-xl text-gray-500", children: "Are you sure you want to delete" }, void 0, !1, {
        fileName: "app/components/modals/DeleteModal/index.tsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("form", { method: "POST", className: "flex items-center gap-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_flowbite_react7.Button, { color: "failure", type: "submit", children: "Yes, I'm sure" }, void 0, !1, {
          fileName: "app/components/modals/DeleteModal/index.tsx",
          lineNumber: 24,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_react10.Link, { to: "#", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_flowbite_react7.Button, { color: "gray", children: "No, cancel" }, void 0, !1, {
          fileName: "app/components/modals/DeleteModal/index.tsx",
          lineNumber: 28,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/components/modals/DeleteModal/index.tsx",
          lineNumber: 27,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/modals/DeleteModal/index.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/modals/DeleteModal/index.tsx",
      lineNumber: 18,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/modals/DeleteModal/index.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/modals/DeleteModal/index.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}, DeleteModal_default = DeleteModal;

// app/components/modals/AddModal/index.tsx
var import_flowbite_react8 = require("flowbite-react"), import_hi6 = require("react-icons/hi"), import_react11 = require("@remix-run/react"), import_jsx_dev_runtime12 = require("react/jsx-dev-runtime"), AddModal = ({ title, visible, body }) => {
  let navigate = (0, import_react11.useNavigate)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_flowbite_react8.Modal, { onClose: () => navigate("#"), show: visible, children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("form", { method: "POST", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_flowbite_react8.Modal.Header, { className: "border-b border-gray-200 !p-6 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("strong", { children: title }, void 0, !1, {
      fileName: "app/components/modals/AddModal/index.tsx",
      lineNumber: 18,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/modals/AddModal/index.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    body,
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_flowbite_react8.Modal.Footer, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_flowbite_react8.Button, { color: "success", type: "submit", className: "px-1", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_hi6.HiPlus, { className: "mr-1" }, void 0, !1, {
        fileName: "app/components/modals/AddModal/index.tsx",
        lineNumber: 23,
        columnNumber: 13
      }, this),
      "Add"
    ] }, void 0, !0, {
      fileName: "app/components/modals/AddModal/index.tsx",
      lineNumber: 22,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/modals/AddModal/index.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/modals/AddModal/index.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/modals/AddModal/index.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}, AddModal_default = AddModal;

// app/components/modals/UpdateItemModal/index.tsx
var import_flowbite_react9 = require("flowbite-react"), import_hi7 = require("react-icons/hi"), import_react12 = require("@remix-run/react"), import_jsx_dev_runtime13 = require("react/jsx-dev-runtime"), UpdateItemModal = ({
  title,
  visible,
  body
}) => {
  let navigate = (0, import_react12.useNavigate)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_flowbite_react9.Modal, { onClose: () => navigate("#"), show: visible, children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("form", { method: "POST", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_flowbite_react9.Modal.Header, { className: "border-b border-gray-200 !p-6 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("strong", { children: title }, void 0, !1, {
      fileName: "app/components/modals/UpdateItemModal/index.tsx",
      lineNumber: 22,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/modals/UpdateItemModal/index.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    body,
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_flowbite_react9.Modal.Footer, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_flowbite_react9.Button, { color: "warning", type: "submit", className: "px-1", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_hi7.HiOutlinePencilAlt, { className: "mr-1" }, void 0, !1, {
        fileName: "app/components/modals/UpdateItemModal/index.tsx",
        lineNumber: 27,
        columnNumber: 13
      }, this),
      "Update"
    ] }, void 0, !0, {
      fileName: "app/components/modals/UpdateItemModal/index.tsx",
      lineNumber: 26,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/modals/UpdateItemModal/index.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/modals/UpdateItemModal/index.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/modals/UpdateItemModal/index.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}, UpdateItemModal_default = UpdateItemModal;

// app/components/body-modals/AddCustomerModalBody/index.tsx
var import_flowbite_react10 = require("flowbite-react"), import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), AddCustomerModalBody = ({
  positions
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Modal.Body, { children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Label, { htmlFor: "first_name", children: "First name" }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 17,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        import_flowbite_react10.TextInput,
        {
          id: "first_name",
          name: "first_name",
          placeholder: "Bonnie",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
          lineNumber: 19,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 18,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Label, { htmlFor: "last_name", children: "Last name" }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        import_flowbite_react10.TextInput,
        {
          id: "last_name",
          name: "last_name",
          placeholder: "Green",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
          lineNumber: 30,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Label, { htmlFor: "national_id", children: "National ID" }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        import_flowbite_react10.TextInput,
        {
          id: "national_id",
          name: "national_id",
          placeholder: "2619032640841",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
          lineNumber: 41,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Label, { htmlFor: "position", children: "Position" }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Select, { id: "position", name: "position", children: positions == null ? void 0 : positions.map((position) => {
        let { id, name } = position;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("option", { value: id, children: name }, id, !1, {
          fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
          lineNumber: 56,
          columnNumber: 19
        }, this);
      }) }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 52,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 49,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Label, { htmlFor: "salary", children: "Salary" }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.TextInput, { id: "salary", name: "salary", placeholder: "18000", required: !0 }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 67,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 66,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Label, { htmlFor: "tel_no", children: "Tel" }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        import_flowbite_react10.TextInput,
        {
          id: "tel_no",
          name: "tel_no",
          placeholder: "0816124453",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
          lineNumber: 73,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 72,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 70,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
    lineNumber: 15,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_flowbite_react10.Label, { htmlFor: "address_details", children: "Address" }, void 0, !1, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
      import_flowbite_react10.Textarea,
      {
        id: "address_details",
        name: "address_details",
        placeholder: "Columbus Oklahoma 1629",
        rows: 3,
        required: !0
      },
      void 0,
      !1,
      {
        fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
        lineNumber: 85,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
      lineNumber: 84,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
    lineNumber: 82,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/body-modals/AddCustomerModalBody/index.tsx",
  lineNumber: 14,
  columnNumber: 5
}, this), AddCustomerModalBody_default = AddCustomerModalBody;

// app/components/body-modals/UpdateCustomerModalBody/index.tsx
var import_flowbite_react11 = require("flowbite-react"), import_jsx_dev_runtime15 = require("react/jsx-dev-runtime"), UpdateCustomerModalBody = ({
  positions,
  customer
}) => {
  let {
    first_name,
    last_name,
    national_id,
    occupation_types_id,
    salary,
    tel_no,
    address_details
  } = customer || {};
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Modal.Body, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Label, { htmlFor: "first_name", children: "First name" }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 37,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_flowbite_react11.TextInput,
          {
            id: "first_name",
            name: "first_name",
            placeholder: "Bonnie",
            defaultValue: first_name,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
            lineNumber: 39,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Label, { htmlFor: "last_name", children: "Last name" }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 49,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_flowbite_react11.TextInput,
          {
            id: "last_name",
            name: "last_name",
            placeholder: "Green",
            defaultValue: last_name,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
            lineNumber: 51,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 50,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Label, { htmlFor: "national_id", children: "National ID" }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_flowbite_react11.TextInput,
          {
            id: "national_id",
            name: "national_id",
            placeholder: "2619032640841",
            defaultValue: national_id,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
            lineNumber: 63,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Label, { htmlFor: "position", children: "Position" }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: occupation_types_id && /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_flowbite_react11.Select,
          {
            id: "position",
            name: "position",
            defaultValue: occupation_types_id,
            children: positions == null ? void 0 : positions.map((position) => {
              let { id, name } = position;
              return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("option", { value: id, children: name }, id, !1, {
                fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
                lineNumber: 84,
                columnNumber: 21
              }, this);
            })
          },
          void 0,
          !1,
          {
            fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
            lineNumber: 76,
            columnNumber: 15
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Label, { htmlFor: "salary", children: "Salary" }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 94,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_flowbite_react11.TextInput,
          {
            id: "salary",
            name: "salary",
            placeholder: "18000",
            defaultValue: salary,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
            lineNumber: 96,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Label, { htmlFor: "tel_no", children: "Tel" }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_flowbite_react11.TextInput,
          {
            id: "tel_no",
            name: "tel_no",
            placeholder: "0816124453",
            defaultValue: tel_no,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
            lineNumber: 108,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 107,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_flowbite_react11.Label, { htmlFor: "address_details", children: "Address" }, void 0, !1, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 119,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mt-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
        import_flowbite_react11.Textarea,
        {
          id: "address_details",
          name: "address_details",
          placeholder: "Columbus Oklahoma 1629",
          defaultValue: address_details,
          rows: 3,
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
          lineNumber: 121,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/body-modals/UpdateCustomerModalBody/index.tsx",
    lineNumber: 34,
    columnNumber: 5
  }, this);
}, UpdateCustomerModalBody_default = UpdateCustomerModalBody;

// app/routes/customers.tsx
var import_flowbite_react12 = require("flowbite-react"), import_jsx_dev_runtime16 = require("react/jsx-dev-runtime"), ITEMS_PER_PAGE = 10;
async function loader2({ request }) {
  let { searchParams } = new URL(request.url), pageParams = Number(searchParams.get("page") || 0), customerId = Number(searchParams.get("customerId")), search = searchParams.get("search"), modal = searchParams.get("modal-type"), page = pageParams === 0 ? pageParams : pageParams - 1, from = page * ITEMS_PER_PAGE, to = from + ITEMS_PER_PAGE - 1, { data: positions } = await getPositionListItems(), { data: customer } = await getCustomerById(customerId);
  if (search) {
    let {
      data: customers2,
      count: count2,
      error: error2
    } = await searchCustomer({ search, from, to });
    return error2 ? new Response("Could not load data", { status: 500 }) : (0, import_node3.json)({
      search,
      customer,
      customers: customers2,
      positions,
      totalPage: Math.ceil(count2 / ITEMS_PER_PAGE),
      currentPage: page + 1,
      modal
    });
  }
  let {
    data: customers,
    count,
    error
  } = await getCustomerListItems({ from, to });
  return error ? new Response("Could not load data", { status: 500 }) : (0, import_node3.json)({
    search: "",
    customer,
    customers,
    positions,
    totalPage: Math.ceil(count / ITEMS_PER_PAGE),
    currentPage: page + 1,
    modal
  });
}
async function action({ request }) {
  let { searchParams } = new URL(request.url), formData = await request.formData(), modal = searchParams.get("modal-type"), customerId = Number(searchParams.get("customerId")), {
    first_name,
    last_name,
    national_id,
    position,
    salary,
    address_details,
    tel_no
  } = Object.fromEntries(formData);
  return modal === "delete" && customerId ? (await deleteCustomer(customerId), (0, import_node3.redirect)("#")) : modal === "add" && first_name && last_name && national_id && position && salary && address_details && tel_no ? (await createCustomer({
    first_name: String(first_name),
    last_name: String(last_name),
    national_id: Number(national_id),
    position: Number(position),
    salary: Number(salary),
    address_details: String(address_details),
    tel_no: String(tel_no)
  }), (0, import_node3.redirect)("#")) : modal === "edit" && first_name && last_name && national_id && position && salary && address_details && tel_no ? (await updateCustomer({
    customerId,
    first_name: String(first_name),
    last_name: String(last_name),
    national_id: Number(national_id),
    position: Number(position),
    salary: Number(salary),
    address_details: String(address_details),
    tel_no: String(tel_no)
  }), (0, import_node3.redirect)("#")) : null;
}
function CustomerPage2() {
  let {
    search,
    customer,
    customers,
    positions,
    totalPage,
    currentPage,
    modal
  } = (0, import_react13.useLoaderData)(), hasSearch = search && `search=${search}&`;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(MainLayout_default, { isFooter: !1, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "space-y-4 bg-white p-4 shadow dark:bg-gray-800 sm:p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h2", { className: "text-4xl font-bold text-gray-900 dark:text-white", children: "All Customers" }, void 0, !1, {
        fileName: "app/routes/customers.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(Search_default, { className: "w-1/2", defaultValue: search }, void 0, !1, {
          fileName: "app/routes/customers.tsx",
          lineNumber: 178,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_react13.Link, { to: "?modal-type=add", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_flowbite_react12.Button, { color: "success", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex items-center gap-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_hi8.HiPlus, { className: "text-lg" }, void 0, !1, {
            fileName: "app/routes/customers.tsx",
            lineNumber: 182,
            columnNumber: 17
          }, this),
          "Add Customer"
        ] }, void 0, !0, {
          fileName: "app/routes/customers.tsx",
          lineNumber: 181,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/customers.tsx",
          lineNumber: 180,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/customers.tsx",
          lineNumber: 179,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/customers.tsx",
        lineNumber: 177,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          Pagination_default,
          {
            totalPage,
            currentPage,
            prevPage: `${currentPage <= 1 ? `/customers?${hasSearch}page=1` : `/customers?${hasSearch}page=${currentPage - 1}`}`,
            nextPage: currentPage !== totalPage ? `/customers?${hasSearch}page=${currentPage + 1}` : `/customers?${hasSearch}page=${totalPage}`
          },
          void 0,
          !1,
          {
            fileName: "app/routes/customers.tsx",
            lineNumber: 189,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(CustomersTable_default, { customers, currentPage }, void 0, !1, {
          fileName: "app/routes/customers.tsx",
          lineNumber: 203,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/customers.tsx",
        lineNumber: 188,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/customers.tsx",
      lineNumber: 173,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(DeleteModal_default, { visible: modal === "delete" }, void 0, !1, {
      fileName: "app/routes/customers.tsx",
      lineNumber: 206,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      AddModal_default,
      {
        title: "Add new customer",
        visible: modal === "add",
        body: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(AddCustomerModalBody_default, { positions }, void 0, !1, {
          fileName: "app/routes/customers.tsx",
          lineNumber: 210,
          columnNumber: 15
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/customers.tsx",
        lineNumber: 207,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      UpdateItemModal_default,
      {
        title: "Add new customer",
        visible: modal === "edit",
        body: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(UpdateCustomerModalBody_default, { positions, customer }, void 0, !1, {
          fileName: "app/routes/customers.tsx",
          lineNumber: 216,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/customers.tsx",
        lineNumber: 212,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/customers.tsx",
    lineNumber: 172,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => IndexPage,
  loader: () => loader3
});
var import_node4 = require("@remix-run/node"), import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
async function loader3({ request }) {
  return (0, import_node4.json)({});
}
function IndexPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(MainLayout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "px-4 pt-6", children: "Home" }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action2,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node");
var action2 = async ({ request }) => logout(request);
async function loader4() {
  return (0, import_node5.redirect)("/");
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action3,
  default: () => Login,
  loader: () => loader5,
  meta: () => meta2
});
var import_react14 = require("react"), import_node6 = require("@remix-run/node"), import_react15 = require("@remix-run/react");
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), meta2 = () => [
  {
    title: "Login"
  }
];
async function loader5({ request }) {
  return await getUserId(request) ? (0, import_node6.redirect)("/") : (0, import_node6.json)({});
}
var action3 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = formData.get("redirectTo"), remember = formData.get("remember");
  if (!validateEmail(email))
    return (0, import_node6.json)({ errors: { email: "Email is invalid." } }, { status: 400 });
  if (typeof password != "string")
    return (0, import_node6.json)(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  if (password.length < 6)
    return (0, import_node6.json)(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  return user ? createUserSession({
    request,
    userId: user.id,
    remember: remember === "on",
    redirectTo: typeof redirectTo == "string" ? redirectTo : "/notes"
  }) : (0, import_node6.json)(
    { errors: { email: "Invalid email or password" } },
    { status: 400 }
  );
};
function Login() {
  var _a, _b, _c, _d, _e, _f;
  let [searchParams] = (0, import_react15.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? "/notes", actionData = (0, import_react15.useActionData)(), emailRef = (0, import_react14.useRef)(null), passwordRef = (0, import_react14.useRef)(null);
  return (0, import_react14.useEffect)(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email && ((_b2 = emailRef == null ? void 0 : emailRef.current) == null || _b2.focus()), (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef == null ? void 0 : passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_react15.Form, { method: "post", className: "space-y-6", noValidate: !0, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "email", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("span", { className: "block text-gray-700", children: "Email Address" }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 100,
          columnNumber: 15
        }, this),
        ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("span", { className: "block pt-1 text-red-700", id: "email-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 102,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        "input",
        {
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          autoComplete: "email",
          type: "email",
          name: "email",
          id: "email",
          "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.email ? !0 : void 0,
          "aria-describedby": "email-error",
          ref: emailRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 107,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 98,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "password", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("span", { className: "block text-gray-700", children: "Password" }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 120,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("span", { className: "block font-light text-gray-700", children: "Must have at least 6 characters." }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 121,
          columnNumber: 15
        }, this),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("span", { className: "pt-1 text-red-700", id: "password-error", children: (_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.password }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 125,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        "input",
        {
          id: "password",
          type: "password",
          name: "password",
          autoComplete: "",
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          "aria-invalid": (_f = actionData == null ? void 0 : actionData.errors) != null && _f.password ? !0 : void 0,
          "aria-describedby": "password-error",
          ref: passwordRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 130,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      "button",
      {
        className: "w-full rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
        type: "submit",
        children: "Log in"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 141,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 147,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          "input",
          {
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
            id: "remember",
            name: "remember",
            type: "checkbox"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 150,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          "label",
          {
            className: "ml-2 block text-sm text-gray-900",
            htmlFor: "remember",
            children: "Remember me"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 156,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 149,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          import_react15.Link,
          {
            className: "text-blue-500 underline",
            to: { pathname: "/join" },
            children: "Sign up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 165,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 163,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 148,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 97,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 96,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 95,
    columnNumber: 5
  }, this);
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action4,
  default: () => Join,
  loader: () => loader6,
  meta: () => meta3
});
var import_node7 = require("@remix-run/node"), import_react16 = require("@remix-run/react");
var import_react17 = require("react"), import_jsx_dev_runtime19 = require("react/jsx-dev-runtime"), meta3 = () => [
  {
    title: "Sign Up"
  }
];
async function loader6({ request }) {
  return await getUserId(request) ? (0, import_node7.redirect)("/") : (0, import_node7.json)({});
}
var action4 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = formData.get("redirectTo");
  if (!validateEmail(email))
    return (0, import_node7.json)(
      { errors: { email: "Email is invalid." } },
      { status: 400 }
    );
  if (typeof password != "string")
    return (0, import_node7.json)(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  if (password.length < 6)
    return (0, import_node7.json)(
      { errors: { password: "Password is too short." } },
      { status: 400 }
    );
  if (await getProfileByEmail(email))
    return (0, import_node7.json)(
      { errors: { email: "A user already exists with this email." } },
      { status: 400 }
    );
  let user = await createUser(email, password);
  return createUserSession({
    request,
    userId: user.id,
    remember: !1,
    redirectTo: typeof redirectTo == "string" ? redirectTo : "/"
  });
};
function Join() {
  var _a, _b, _c, _d, _e, _f;
  let [searchParams] = (0, import_react16.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react16.useActionData)(), emailRef = (0, import_react17.useRef)(null), passwordRef = (0, import_react17.useRef)(null);
  return (0, import_react17.useEffect)(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email && ((_b2 = emailRef == null ? void 0 : emailRef.current) == null || _b2.focus()), (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef == null ? void 0 : passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_react16.Form, { className: "space-y-6", method: "post", noValidate: !0, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "email", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "block text-gray-700", children: "Email Address" }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 108,
          columnNumber: 15
        }, this),
        ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "block pt-1 text-red-700", id: "email-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 110,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 107,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
        "input",
        {
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          type: "email",
          name: "email",
          id: "email",
          required: !0,
          "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.email ? !0 : void 0,
          "aria-describedby": "email-error",
          ref: emailRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 115,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "password", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "block text-gray-700", children: "Password" }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 128,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "block font-light text-gray-700", children: "Must have at least 6 characters." }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 129,
          columnNumber: 15
        }, this),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "pt-1 text-red-700", id: "password-error", children: (_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.password }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 133,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 127,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
        "input",
        {
          id: "password",
          type: "password",
          name: "password",
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          autoComplete: "new-password",
          "aria-invalid": (_f = actionData == null ? void 0 : actionData.errors) != null && _f.password ? !0 : void 0,
          "aria-describedby": "password-error",
          ref: passwordRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 138,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 126,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
      "button",
      {
        className: "w-full rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
        type: "submit",
        children: "Create Account"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/join.tsx",
        lineNumber: 149,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 155,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
        import_react16.Link,
        {
          className: "text-blue-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 159,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 157,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 156,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 105,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 104,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 103,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-RF5EGMA3.js", imports: ["/build/_shared/chunk-4FKIEHRQ.js", "/build/_shared/chunk-3BQGE6GF.js", "/build/_shared/chunk-DG4HR4CT.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-2FVET2K4.js", imports: ["/build/_shared/chunk-UEX42S2U.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-IASVAJGK.js", imports: ["/build/_shared/chunk-NWVO23WS.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/contracts": { id: "routes/contracts", parentId: "root", path: "contracts", index: void 0, caseSensitive: void 0, module: "/build/routes/contracts-H57HMVCM.js", imports: ["/build/_shared/chunk-NWVO23WS.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/customers": { id: "routes/customers", parentId: "root", path: "customers", index: void 0, caseSensitive: void 0, module: "/build/routes/customers-I6UAML3D.js", imports: ["/build/_shared/chunk-NWVO23WS.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-RZM2UEYN.js", imports: ["/build/_shared/chunk-P6YNAKDB.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-4FRSSAHI.js", imports: ["/build/_shared/chunk-P6YNAKDB.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-IVCPR3TQ.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, version: "edc196a8", hmr: void 0, url: "/build/manifest-EDC196A8.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/contracts": {
    id: "routes/contracts",
    parentId: "root",
    path: "contracts",
    index: void 0,
    caseSensitive: void 0,
    module: contracts_exports
  },
  "routes/customers": {
    id: "routes/customers",
    parentId: "root",
    path: "customers",
    index: void 0,
    caseSensitive: void 0,
    module: customers_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
