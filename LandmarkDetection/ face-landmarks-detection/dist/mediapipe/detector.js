"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.load = void 0;
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var faceMesh = require("@mediapipe/face_mesh");
var tf = require("@tensorflow/tfjs-core");
var constants_1 = require("../constants");
var landmarks_to_detection_1 = require("../shared/calculators/landmarks_to_detection");
var detector_utils_1 = require("./detector_utils");
/**
 * MediaPipe detector class.
 */
var MediaPipeFaceMeshMediaPipeLandmarksDetector = /** @class */ (function () {
    // Should not be called outside.
    function MediaPipeFaceMeshMediaPipeLandmarksDetector(config) {
        var _this = this;
        // This will be filled out by asynchronous calls to onResults. They will be
        // stable after `await send` is called on the faces solution.
        this.width = 0;
        this.height = 0;
        this.selfieMode = false;
        this.faceMeshSolution = new faceMesh.FaceMesh({
            locateFile: function (path, base) {
                if (config.solutionPath) {
                    var solutionPath = config.solutionPath.replace(/\/+$/, '');
                    return solutionPath + "/" + path;
                }
                return base + "/" + path;
            }
        });
        this.faceMeshSolution.setOptions({
            refineLandmarks: config.refineLandmarks,
            selfieMode: this.selfieMode,
            maxNumFaces: config.maxFaces
        });
        this.faceMeshSolution.onResults(function (results) {
            _this.height = results.image.height;
            _this.width = results.image.width;
            _this.faces = [];
            if (results.multiFaceLandmarks !== null) {
                var landmarksList = results.multiFaceLandmarks;
                for (var i = 0; i < landmarksList.length; i++) {
                    var keypoints = _this.translateOutput(landmarksList[i]);
                    _this.faces.push({
                        keypoints: keypoints,
                        box: landmarks_to_detection_1.landmarksToDetection(keypoints).locationData.relativeBoundingBox
                    });
                }
            }
        });
    }
    MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.translateOutput = function (landmarks) {
        var _this = this;
        var keypoints = landmarks.map(function (landmark, i) {
            var keypoint = {
                x: landmark.x * _this.width,
                y: landmark.y * _this.height,
                z: landmark.z * _this.width
            };
            var name = constants_1.MEDIAPIPE_FACE_MESH_KEYPOINTS.get(i);
            if (name != null) {
                keypoint.name = name;
            }
            return keypoint;
        });
        return keypoints;
    };
    /**
     * Estimates faces for an image or video frame.
     *
     * It returns a single face or multiple faces based on the maxFaceMesh
     * parameter passed to the constructor of the class.
     *
     * @param input
     * ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement The input
     * image to feed through the network.
     *
     * @param config Optional.
     *       flipHorizontal: Optional. Default to false. When image data comes
     *       from camera, the result has to flip horizontally.
     *
     *       staticImageMode: Optional. Defaults to false. Currently unused in
     * this implementation. Image input types are assumed to be static images, and
     * video inputs are assumed to be non static images.
     *
     * @return An array of `Face`s.
     */
    MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.estimateFaces = function (input, estimationConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (estimationConfig && estimationConfig.flipHorizontal &&
                            (estimationConfig.flipHorizontal !== this.selfieMode)) {
                            this.selfieMode = estimationConfig.flipHorizontal;
                            this.faceMeshSolution.setOptions({
                                selfieMode: this.selfieMode
                            });
                        }
                        if (!(input instanceof tf.Tensor)) return [3 /*break*/, 2];
                        _b = ImageData.bind;
                        return [4 /*yield*/, tf.browser.toPixels(input)];
                    case 1:
                        _a = new (_b.apply(ImageData, [void 0, _c.sent(), input.shape[1], input.shape[0]]))();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = input;
                        _c.label = 3;
                    case 3:
                        // Cast to GL TexImageSource types.
                        input = _a;
                        return [4 /*yield*/, this.faceMeshSolution.send({ image: input })];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, this.faces];
                }
            });
        });
    };
    MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.dispose = function () {
        this.faceMeshSolution.close();
    };
    MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.reset = function () {
        this.faceMeshSolution.reset();
        this.width = 0;
        this.height = 0;
        this.faces = null;
        this.selfieMode = false;
    };
    MediaPipeFaceMeshMediaPipeLandmarksDetector.prototype.initialize = function () {
        return this.faceMeshSolution.initialize();
    };
    return MediaPipeFaceMeshMediaPipeLandmarksDetector;
}());
/**
 * Loads the MediaPipe solution.
 *
 * @param modelConfig An object that contains parameters for
 * the MediaPipeFaceMesh loading process. Please find more details of each
 * parameters in the documentation of the
 * `MediaPipeFaceMeshMediaPipeModelConfig` interface.
 */
function load(modelConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, detector;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = detector_utils_1.validateModelConfig(modelConfig);
                    detector = new MediaPipeFaceMeshMediaPipeLandmarksDetector(config);
                    return [4 /*yield*/, detector.initialize()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, detector];
            }
        });
    });
}
exports.load = load;
