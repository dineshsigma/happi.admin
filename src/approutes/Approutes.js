import { Route, Routes } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Master from "../pages/Master";
import FileManager from "../pages/FileManager";
import Analytics from "../pages/Analytics";
import Order from "../pages/Order";
import Saved from "../pages/Saved";
import Setting from "../pages/Setting";
import Login from "../pages/Login";
import Departments from "../pages/Departments";
import CreateTask from "../pages/CreateTask";
import Locations from "../pages/Locations"
import Designations from '../pages/Designations'
import Organizations from '../pages/Organizations'
import Groups from '../pages/Groups'
import Taskslist from '../pages/Tasklists'
import SignUp from "../pages/Signup";
import { useSelector } from "react-redux";
import UserDetails from "../pages/UserDetails";
import OrganisationDetails from "../pages/organisationDetails";
import Otp from "../pages/otp";
import Profile from '../pages/Profile'
import Help from '../pages/Help'
import Tickets from '../pages/Tickets'
import Announcements from "../pages/Announcements";
import PersonalTodo from "../pages/PersonalTodo";
import ReccuringTaskList from "../pages/ReccuringTaskList";
import RaisedTickets from "../pages/RaisedTickets";
import Header from '../components/Header'

// Happi Admin new file imports 
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import Media from '../pages/Media';
import Banners from "../pages/Banners";
import RelatedProduct from "../pages/RelatedProduct";
import ProductStock from "../pages/ProductStock";
import HomePage from "../pages/HomePage";
import HappiPages from "../pages/HappiPages";
import Blogs from "../pages/Blogs";
import Reviews from "../pages/Reviews";
import Stores from "../pages/Stores";
import CampaignBuilders from "../pages/CampaignBuilders";
import ProductCodes from "../pages/ProductCodes";
import Orders from "../pages/Orders";
import StoresStockPage from "../pages/StoresStockPage";
import StockPriceUpdate from "../pages/StockPriceUpdate";
import CartUserDetails from "../pages/CartUserDetails";
import AbandonedCart from "../pages/AbandonedCart";
import IngramOrdersHappi from "../pages/IngramOrdersHappi";
import UsersHappi from "../pages/UsersHappi";
import MerchantDetails from "../pages/MerchantDetails";
import Offers from "../pages/Offers";
import CouponCode from "../pages/CouponCode";
import Vouchers from "../pages/Vouchers";
import CampaignLeads from "../pages/CampaignLeads";
import ExportFilter from "../pages/ExportFilter";
import EmployeeLeads from "../pages/EmployeeLeads";
import Followers from "../pages/Followers";
import Settings from "../pages/Settings";
import DeliveryIntegrations from "../pages/DeliveryIntegrations";
import Notification from "../pages/Notification";
import CouponCodeTemplate from "../pages/CouponCodeTemplate";
import BajajStock from "../pages/BajajStock";
import BajajStockMaster from "../pages/BajajStockMaster";
import BajajStockReport from "../pages/BajajStockReport";
import AkshayaPatra from "../pages/AkshayaPatra";
import FlipkartStockSync from "../pages/FlipkartStockSync";
import StoreStockReport from "../pages/StoreStockReport";
import EcomStockreport from "../pages/EcomStockreport";
import LeadsMISReports from "../pages/LeadsMISReports";
import OrdersReport from "../pages/OrdersReport";
import VoucherCodeReport from "../pages/VoucherCodeReport";
import MobilesLeadsReports from "../pages/MobilesLeadsReports";
import DashboardReports from "../pages/DashboardReports";
import IngramStockReport from "../pages/IngramStockReport";
import IngramOrders from "../pages/IngramOrders";
import NewIngramStock from "../pages/NewIngramStock";
import InfluencerLeads from "../pages/InfluencerLeads";
import AkshayaPatraParticipation from "../pages/AkshayaPatraParticipation";
import AkshayaPatraCustomerMessages from "../pages/AkshayaPatraCustomerMessages";
import AkshayaPatraStoreManager from "../pages/AkshayaPatraStoreManager";
import OneAssistSync from "../pages/OneAssistSync";
import BajajOrders from "../pages/BajajOrders";
import MSIReports from "../pages/MSIReport";
import TargetsAndAchievements from "../pages/TargetsAndAchievements";
import MSIHappiCare from "../pages/MSIHappiCare";
import FlashGuradReport from "../pages/FlashGaurdReport";
import BranchAndBrandWiseValue from "../pages/BranchAndBrandWiseValue";
import BranchAndBrandWiseQty from "../pages/BranchAndBrandWiseQty";
import AccessoriesBranchProductMTDVSLMTD from "../pages/AccessoriesBranchProductMTDVSLMTD";
import ItemModelWiseMTDVSLMTDQTY from "../pages/ItemModelWiseMTDVSLMTDqty";
import BranchWiseASPMobiles from "../pages/BrandWiseASPMobiles";
import DateWiseQtyAndValueData from "../pages/DateWiseQtyAndValueData";
import BranchWiseQtyAndValueData from "../pages/BranchWiseQtyAndValueData";
import BrandWiseASPAccessories from "../pages/BrandWiseASPAccessories";
import VivoAndOppo from "../pages/VivoAndOppo";
import Tvs from "../pages/Tvs";
import BrandWiseHappiCareData from "../pages/BrandWiseHappiCareData";
import FTDAndMTDGrowth from "../pages/FTDAndMTDGrowth";
import GPReports from "../pages/GPReport";
import GrowthPriceReports from "../pages/GrowthPriceReport";
import BrandWiseMobiles from "../pages/BrandWiseMobiles";
import ProductWiseAccessories from "../pages/ProductWiseAccessories";
import BranchWiseMobiles from "../pages/BranchWiseMobiles";
import BranchWiseAccessories from "../pages/BranchWiseAccessories";
import ItemModelWiseMobiles from "../pages/ItemModelWiseMobiles";
import ItemModelWiseAccessories from "../pages/ItemModelWiseAccessories";
import PurchaseReports from "../pages/PurchaseReports";
import IphoneTerminalLogs from "../pages/IphoneTerminalLogs";
import ManufacturingProducts from "../pages/ManufacturingProducts";
import SaleReturn from "../pages/SaleReturn";
import DashboardsTargetvsAchievement from "../pages/DashboardsTargetvsAchievement";
import LandingPages from "../pages/LandingPages";
import EmployeeAppLogs from "../pages/EmployeeAppLogs";
import StoreOffers from "../pages/StoreOffers";
import HappiPremierLeague from "../pages/HappiPremierLeague";
import BajajExcelUpload from "../pages/BajajExcelUpload";
import BranchTargets from "../pages/BranchTargets";
import WorldCupMoment from "../pages/WorldCupMoment";

const Approutes = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const accessFor = useSelector((state) => state.auth.accessFor);
    return (<div>
            {isLoggedIn && accessFor ?
                <>
                    <SideBar>
                        <section>
                            <Header/>
                            <Routes>
                                <Route path="/" element={< Dashboard />}/>
                                <Route path="/categories" element={< Categories />}/>
                                <Route path="/products" element={< Products />}/>
                                <Route path="/media" element={< Media />}/>
                                <Route path="/banners" element={< Banners />}/>
                                <Route path="/relatedproducts" element={< RelatedProduct />}/>
                                <Route path="/productStock" element={< ProductStock />}/>
                                <Route path="/homepage" element={< HomePage />}/>
                                <Route path="/happipages" element={< HappiPages />}/>
                                <Route path="/blogs" element={< Blogs />}/>
                                <Route path="/reviews" element={< Reviews />}/>
                                <Route path="/stores" element={< Stores />}/>
                                <Route path="/campaignbuilders" element={< CampaignBuilders />}/>
                                <Route path="/productcodes" element={< ProductCodes />}/>
                                <Route path="/orders" element={< Orders />}/>
                                <Route path="/storesstockpage" element={< StoresStockPage />}/>
                                <Route path="/stockpriceupdate" element={< StockPriceUpdate />}/>
                                <Route path="/cartuserdetails" element={< CartUserDetails />}/>
                                <Route path="/abandonedcart" element={< AbandonedCart />}/>
                                <Route path="/ingramordershappi" element={< IngramOrdersHappi />}/>
                                <Route path="/usershappi" element={< UsersHappi />}/>
                                <Route path="/merchantdetails" element={< MerchantDetails />}/>
                                <Route path="/offers" element={< Offers />}/>
                                <Route path="/couponcode" element={< CouponCode />}/>
                                <Route path="/vouchers" element={< Vouchers />}/>
                                <Route path="/campaignleads" element={< CampaignLeads />}/>
                                <Route path="/exportfilter" element={< ExportFilter />}/>
                                <Route path="/employeeleads" element={< EmployeeLeads />}/>
                                <Route path="/followers" element={< Followers />}/>
                                <Route path="/settings" element={< Settings />}/>
                                <Route path="/DeliveryIntegrations" element={< DeliveryIntegrations />}/>
                                <Route path="/Notification" element={< Notification />}/>
                                <Route path="/CouponCodeTemplate" element={< CouponCodeTemplate />}/>
                                <Route path="/BajajStock" element={< BajajStock />}/>
                                <Route path="/BajajStockMaster" element={< BajajStockMaster />}/>
                                <Route path="/BajajStockReport" element={< BajajStockReport />}/>
                                <Route path="/AkshayaPatra" element={< AkshayaPatra />}/>
                                <Route path="/FlipkartStockSync" element={< FlipkartStockSync />}/>
                                <Route path="/StoreStockReport" element={< StoreStockReport />}/>
                                <Route path="/EcomStockreport" element={< EcomStockreport />}/>
                                <Route path="/LeadsMISReports" element={< LeadsMISReports />}/>
                                <Route path="/OrdersReport" element={< OrdersReport />}/>
                                <Route path="/VoucherCodeReport" element={< VoucherCodeReport />}/>
                                <Route path="/MobilesLeadsReports" element={< MobilesLeadsReports />}/>
                                <Route path="/InfluencerLeads" element={< InfluencerLeads />}/>
                                <Route path="/DashboardReports" element={< DashboardReports />}/>
                                <Route path="/IngramStockReport" element={< IngramStockReport />}/>
                                <Route path="/IngramOrders" element={< IngramOrders />}/>
                                <Route path="/NewIngramStock" element={< NewIngramStock />}/>
                                <Route path="/AkshayaPatraParticipation" element={< AkshayaPatraParticipation />}/>
                                <Route path="/AkshayaPatraCustomerMessages" element={< AkshayaPatraCustomerMessages />}/>
                                <Route path="/AkshayaPatraStoreManager" element={< AkshayaPatraStoreManager />}/>
                                <Route path="/OneAssistSync" element={< OneAssistSync />}/>
                                <Route path="/bajajorders" element={< BajajOrders />}/>
                                <Route path="/misreports" element={< MSIReports />}/>
                                <Route path="/targetandachievements" element={< TargetsAndAchievements />}/>
                                <Route path="/happicare" element={< MSIHappiCare />}/>
                                <Route path="/flashguardreport" element={< FlashGuradReport />}/>
                                <Route path="/branchandbrandwisevalue" element={< BranchAndBrandWiseValue />}/>
                                <Route path="/branchandbrandwisequantity" element={< BranchAndBrandWiseQty />}/>
                                <Route path="/accessoriesbranch-productmtd-vs-lmtd" element={< AccessoriesBranchProductMTDVSLMTD />}/>
                                <Route path="/itemmodelwise-mtd-vs-lmtd-qty" element={< ItemModelWiseMTDVSLMTDQTY />}/>
                                <Route path="/brand-wise-asp-mobiles" element={< BranchWiseASPMobiles />}/>
                                <Route path="/datewise-qty-and-valuedata" element={< DateWiseQtyAndValueData />}/>
                                <Route path="/branch-wise-qty-and-valuedata" element={< BranchWiseQtyAndValueData />}/>
                                <Route path="/brand-wise-asp-accessories" element={< BrandWiseASPAccessories />}/>
                                <Route path="/vivoandoppo" element={< VivoAndOppo />}/>
                                <Route path="/tvs" element={< Tvs />}/>
                                <Route path="/brandwise-happicare-data" element={< BrandWiseHappiCareData />}/>
                                <Route path="/ftdandmtdgrowth" element={< FTDAndMTDGrowth />}/>
                                <Route path="/gpreports" element={< GPReports />}/>
                                <Route path="/growthpricereports" element={< GrowthPriceReports />}/>
                                <Route path="/brandwisemobiles" element={< BrandWiseMobiles />}/>
                                <Route path="/productwiseaccessories" element={< ProductWiseAccessories />}/>
                                <Route path="/branchwisemobiles" element={< BranchWiseMobiles />}/>
                                <Route path="/branchwiseaccessories" element={< BranchWiseAccessories />}/>
                                <Route path="/itemmodelwisemobiles" element={< ItemModelWiseMobiles />}/>
                                <Route path="/itemmodelwiseaccessories" element={< ItemModelWiseAccessories />}/>
                                <Route path="/purchasereports" element={<PurchaseReports />}/>
                                <Route path="/iphoneterminallogs" element={<IphoneTerminalLogs />}/>
                                <Route path="/manufacturingproducts" element={<ManufacturingProducts />}/>
                                <Route path="/salereturn" element={<SaleReturn />}/>
                                <Route path="/dashboardtargetvsachievement" element={<DashboardsTargetvsAchievement />}/>
                                <Route path="/landingpages" element={<LandingPages />}/>
                                <Route path="/employeeapplogs" element={<EmployeeAppLogs />}/>
                                <Route path="/storeoffers" element={<StoreOffers />}/>
                                <Route path="/happipremierleague" element={<HappiPremierLeague />}/>
                                <Route path="/bajajexcelupload" element={<BajajExcelUpload />}/>
                                <Route path="/branch-targets" element={<BranchTargets />}/>
                                <Route path="/world-cup-moment" element={<WorldCupMoment />}/>
                            </Routes>
                        </section>

                    </SideBar>
                </> : <>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<> not found</>} />
                    </Routes>
                </>
            }


    </div>)
}

export default Approutes;