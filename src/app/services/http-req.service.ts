import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Constant } from './constant';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HttpReqService {
  public API_URL = environment.apiUrl;
  constructor(
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private gs: GlobalService,
  ) { }

  /**
  * Post API
  * @param {Object} data
  */
  post(path, data, isDisplayToast) {

    return new Promise(async (resolve, _) => {
      const success = (res) => {

        if (res && res.status === 1) {
          if (isDisplayToast) {
            if (path === 'emailTemplate/create') {
              res.message = 'Email Template Added Successfully!';
            }
            // this.toastr.success(res.message, 'Sucess');
            this.gs.resMassage.massage = res.message;
            this.gs.resMassage.status = 'success';
            this.hideMassege();
          }
          resolve(res);
        }
        else {
          resolve(res);
          return this.handleError(res, path, resolve);
        }
      };

      const error = (err) => {
        console.log(3)
        return this.handleError(err, path, resolve);
      };

      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        return this.http
          .post<any>(`${this.API_URL}${path}`, data)
          .subscribe(success, error);
      }
      else {

        // this.toastr.error(Constant.NO_INTERNET_CONNECTION_MSG);
        this.gs.resMassage.massage = Constant.NO_INTERNET_CONNECTION_MSG;
        this.gs.resMassage.status = 'error';
        this.hideMassege();
      }
    });
  }

  /**
   * Get API
   * @param {string} path
   * @param {string} id
   * @returns {object} Promise
   */
  get(path, id) {
    return new Promise(async (resolve, _) => {
      const success = (res) => {
        if (res && res.status === 1) {
          // this.toastr.success(res.message, 'Sucess');
          this.gs.resMassage.massage = res.messag;
          this.gs.resMassage.status = 'success';
          this.hideMassege();
          resolve(res);
        } else {
          return this.handleError(res, path, resolve);
        }
      };
      const error = (err) => {

        return this.handleError(err, path, resolve);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        return this.http
          .get<any>(`${this.API_URL}${path}/${id}`)
          .subscribe(success, error);
      } else {
        // this.toastr.error(Constant.NO_INTERNET_CONNECTION_MSG);
        this.gs.resMassage.massage = Constant.NO_INTERNET_CONNECTION_MSG;
      }
    });
  }

  /**
   * Update API
   * @param {string} path
   * @param {object} data 
   * @returns {object} Promise
   */
  put(path, data) {
    return new Promise(async (resolve, _) => {
      const success = (res) => {
        if (res && res.status === 1) {
          if (path === 'emailTemplate') {
            res.message = 'Email Template Updated Successfully!';
          }
          // this.toastr.success(res.message, 'Sucess');
          this.gs.resMassage.massage = res.message;
          this.gs.resMassage.status = 'success';
          this.hideMassege();
          resolve(res);
        } else {
          resolve(res);
          return this.handleError(res, path, resolve);
        }
      };
      const error = (err) => {

        return this.handleError(err, path, resolve);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        return this.http
          .put<any>(`${this.API_URL}${path}`, data)
          .subscribe(success, error);
      } else {
        // this.toastr.error(Constant.NO_INTERNET_CONNECTION_MSG);
        this.gs.resMassage.massage = Constant.NO_INTERNET_CONNECTION_MSG;
        this.gs.resMassage.status = 'error';

      }
    });
  }

  /**
   * Delete API
   * @param {string} path
   * @param {object} id
   * @returns {object} Promise
   */
  delete(path, id) {
    return new Promise(async (resolve, _) => {
      const success = (res) => {
        if (res && res.status === 1) {
          // this.toastr.success(res.message, 'Sucess');
          this.gs.resMassage.massage = res.message;
          this.gs.resMassage.status = 'success';
          this.hideMassege();
          resolve(res);
        } else {
          return this.handleError(res, path, resolve);
        }
      };
      const error = (err) => {

        return this.handleError(err, path, resolve);
      };
      const netowrkIsConnected = await this.getNetworkConnection();
      if (netowrkIsConnected) {
        return this.http
          .delete<any>(`${this.API_URL}${path}/${id}`)
          .subscribe(success, error);
      } else {

        // this.toastr.error(Constant.NO_INTERNET_CONNECTION_MSG);
        this.gs.resMassage.massage = Constant.NO_INTERNET_CONNECTION_MSG;
        this.gs.resMassage.status = 'error';
        this.hideMassege();
      }
    });
  }

  /**
   *  Check Internet connection
   */
  getNetworkConnection() {
    const isOnline: boolean = navigator.onLine;
    if (isOnline) {
      return true;
    }
    return false;
  }

  /**
   * Handle API err
   * @param {object} err
   */
  handleError(err, path, resolve) {
    if (err.status === 400) {
      const error =
        err.error.error || err.error.message
          ? err.error.error || err.error.message
          : 'Internal Server Error';
      // this.toastr.error(error, 'Error!');
      this.gs.resMassage.massage = error;
      return resolve(err)
    } else if (err.status === 401) {
      const error = err.error.error || err.error.message
        ? err.error.error || err.error.message : '';
      // this.toastr.error(error, 'Error!');
      this.gs.resMassage.massage = error;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      this.authService.currentUserSubjet(null);
      this.router.navigate(['auth/login']);
    } else if (err.status === 404) {
      const error =
        err.error.error || err.error.message
          ? err.error.error || err.error.message
          : 'Internal Server Error';
      // this.toastr.error(error, 'Error!');
      this.gs.resMassage.massage = error;
    } else if (err.status === 500) {
      const error = err.error.error
        ? err.error.error
        : 'Internal Server Error';
      // this.toastr.error(error, 'Error!');
      this.gs.resMassage.massage = error

    } else if (err.status_code === 200) {
      // this.toastr.error(err.message, 'Error!');
      this.gs.resMassage.massage = err.message;
    } else {
      // this.toastr.error('Something Went Wrong!', 'Error');
      this.gs.resMassage.massage = 'Something Went Wrong!';
    }
    this.gs.resMassage.status = 'error';

    if (path == 'users/check_valid_detail') {
      console.log('retuen')
      resolve({})
    }
  }

  hideMassege() {
    setTimeout(() => {
      this.gs.resMassage.massage = null;
      this.gs.resMassage.status = '';
    }, 4000);
  }

  clearMassage() {
    this.gs.resMassage.massage = null;
    this.gs.resMassage.status = '';
  }
}
