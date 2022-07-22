import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import T from 'prop-types';

// Context
const TabsContext = createContext(null);

/**
 * Context provider for the tabs.
 * Stores the active tab and registers tabs when used with <TabItem>
 *
 * @prop {node} children Children to render.
 * @prop {node} initialActive Initial active tab
 * @prop {func} onTabChange Callback when the tab will change.
 */
export function TabsManager({ children, initialActive, onTabChange }) {
  const [activeTab, setActiveTab] = useState(initialActive);
  const [tabList, setTabList] = useState([]);

  const setActiveTabEnhanced = useCallback(
    (newTab) =>
      setActiveTab((oldTab) => {
        typeof onTabChange === 'function' && onTabChange(newTab, oldTab);
        return newTab;
      }),
    [onTabChange]
  );

  const registerTab = useCallback(({ id }) => {
    setTabList((list) => {
      if (list.find((t) => t.id)) {
        // Already added.
        return list;
      } else {
        return list.concat({ id });
      }
    });
  }, []);

  const unregisterTab = useCallback(({ id }) => {
    setTabList((list) => list.filter((t) => t.id !== id));
  }, []);

  // If there's no initial tab set, activate the first one being registered.
  useEffect(() => {
    if (!initialActive && tabList.length) {
      setActiveTabEnhanced(tabList[0].id);
    }
  }, [setActiveTabEnhanced, initialActive, tabList]);

  const value = {
    activeTab,
    setActiveTab: setActiveTabEnhanced,
    registerTab,
    unregisterTab,
    tabList
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

TabsManager.propTypes = {
  children: T.node,
  initialActive: T.string,
  onTabChange: T.func
};

/**
 * Hook for the tabs.
 * Returns the following:
 *
 * activeTab: String
 * setActiveTab: (id: String) => void
 * registerTab: ({id: String}) => void
 * unregisterTab: ({id: String}) => void
 * tabList: [{id: String}]
 *
 * @returns Object
 */
export function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      `The \`useTabs\` hook must be used inside the <TabsContext> component's context.`
    );
  }

  return context;
}
